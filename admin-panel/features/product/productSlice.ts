// redux/slices/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VariantType = "Size" | "Color";
interface Variant {
  id: number;
  type: VariantType;
  sizes: string[];
  colors: string[];
  inputValue: string;
  selectedColor: string;
}

interface ProductState {
  title: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  stock: number;
  tags: string[];
  isDigitalItem: boolean;
  isOnSale: boolean;
  files: File[];
  variants: Variant[];
  category: string; // Optional categories field
}

const initialState: ProductState = {
  title: "",
  description: "",
  basePrice: 0,
  discountPrice: 0,
  stock: 0,
  tags: [],
  isDigitalItem: false,
  isOnSale: false,
  files: [],
  variants: [],
  category: "", // Initialize categories as an empty string
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setBasePrice: (state, action: PayloadAction<number>) => {
      state.basePrice = action.payload;
    },
    setDiscountPrice: (state, action: PayloadAction<number>) => {
      state.discountPrice = action.payload;
    },
    setStock: (state, action: PayloadAction<number>) => {
      state.stock = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setIsDigitalItem: (state, action: PayloadAction<boolean>) => {
      state.isDigitalItem = action.payload;
    },
    setIsOnSale: (state, action: PayloadAction<boolean>) => {
      state.isOnSale = action.payload; // Toggle on sale state
    },
    setFiles: (state, action: PayloadAction<File[]>) => {
      console.log("Setting files:", action.payload);
      state.files = action.payload;
    },
    setVariants: (state, action: PayloadAction<Variant[]>) => {
      state.variants = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload; // Set categories
    }
    ,
    resetProductState: () => initialState,
  },
});

export const {
  setTitle,
  setDescription,
  setBasePrice,
  setDiscountPrice,
  setStock,
  setTags,
  setIsDigitalItem,
  setIsOnSale,
  setFiles,
  setVariants,
  resetProductState,setCategory
} = productSlice.actions;

export default productSlice.reducer;
