import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getLoggedInUser,
  googleLoginUser,
  loginUser,
  registerUser,
  logoutUser,
} from "@/api/authApi";

export const register = createAsyncThunk("auth/register", registerUser);

export const login = createAsyncThunk("auth/login", loginUser);

export const getUser = createAsyncThunk(
  "auth/getLoggedInUser",
  getLoggedInUser
);

export const logout = createAsyncThunk("auth/logout", logoutUser);

const initialState = {
  user: null, // User object will be stored here after successful login
  loading: false, // Loading state for async operations
  error: null, // Error state for async operations
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    /* logout: (state) => {
      state.user = null;
    }, */
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
      toast("Successfully Signed in");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      toast("Successfully Signed in");
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      toast("Successfully Logged out");
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
