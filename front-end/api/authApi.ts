import axiosInstance from "@/lib/axiosInstance";

export const registerUser = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/api/auth/register", credentials, {
    withCredentials: true, // Include cookies
  });
  return res.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/api/auth/login", credentials, {
    withCredentials: true, // So cookie gets set
  });
  return res.data;
};

// src/redux/api/googleLoginUser.ts
export const googleLoginUser = async () => {
  window.open(process.env.NEXT_PUBLIC_API_GOOGLE_CALLBACK_URL, "_self");
};

export const getLoggedInUser = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/me", {
      withCredentials: true, // So cookie is sent
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post("/api/auth/logout", {
      withCredentials: true, // So cookie is sent
    });
  } catch (error) {
    console.log(error);
  }
};
