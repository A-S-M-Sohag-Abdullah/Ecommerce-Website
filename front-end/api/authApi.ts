import axiosInstance from "@/lib/axiosInstance";

export const registerUser = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  console.log("Registering user with credentials:", credentials);
  console.log(axiosInstance.defaults.baseURL);
  const res = await axiosInstance.post("/auth/register", credentials);
  return res.data;
};
