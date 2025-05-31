import axiosInstance from "@/lib/axiosInstance";

type AuthCredential = {
  email: string;
  password: string;
  keepLoggedIn?: boolean; // Optional, defaults to false
};

export const adminLogin = async(authCredential: AuthCredential) => {
  try {
    const res = await axiosInstance.post("/api/admin/auth/login", authCredential, {
      withCredentials: true,
    });
    console.log("Login response:", res.data);
    return res.data;
  } catch (error) {}
};
