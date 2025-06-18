import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export interface CartItem extends Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

interface CartState {
  items: CartItem[];
}

const loadFromLocalStorage = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);
    return [];
  }
};

const saveToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
};

const initialState: CartState = {
  items: typeof window !== "undefined" ? loadFromLocalStorage() : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      toast("Added to Cart", { autoClose: 1000 });
      saveToLocalStorage(state.items);
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToCart, updateCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
