import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  name: string;
  description: string;
  image: File | null;
}

const initialState: Category = {
  name: "",
  description: "",
  image: null, // Initialize with an empty file
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setImage: (state, action: PayloadAction<File | null>) => {
      state.image = action.payload;
    },
    resetCategory: () => initialState, // Reset to initial state
  },
});
export const { setName, setDescription, setImage, resetCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
