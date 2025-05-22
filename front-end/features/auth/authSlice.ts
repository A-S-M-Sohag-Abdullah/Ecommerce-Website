import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLoggedInUser,
  googleLoginUser,
  loginUser,
  registerUser,
} from "@/api/authApi";
import { get } from "http";

export const register = createAsyncThunk("auth/register", registerUser);

export const login = createAsyncThunk("auth/login", loginUser);



export const getUser = createAsyncThunk(
  "auth/getLoggedInUser",
  getLoggedInUser
);

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
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
