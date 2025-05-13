import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@/api/authApi";

export const register = createAsyncThunk("auth/register", registerUser);

export const login = createAsyncThunk("auth/login", loginUser);

const initialState = {
  user: null, // User object will be stored here after successful login
  loading: false, // Loading state for async operations
  error: null, // Error state for async operations
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
