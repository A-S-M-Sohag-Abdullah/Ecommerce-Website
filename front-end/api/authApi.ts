import axiosInstance from "@/lib/axiosInstance";

export const registerUser = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/register", credentials);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// src/redux/api/googleLoginUser.ts
export const googleLoginUser = async () => {
  window.open("http://localhost:5000/api/auth/google/callback", "_self");
};

export const getLoggedInUser = async () => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("res", res);
  return res.data;
};
