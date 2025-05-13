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
