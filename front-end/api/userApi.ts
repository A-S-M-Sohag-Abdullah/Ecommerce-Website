import axiosInstance from "@/lib/axiosInstance";
import { UserType } from "@/types";

export const updateUserProfile = async (formdata: UserType) => {
  try {
    const res = await axiosInstance.put("/api/users/profile", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
