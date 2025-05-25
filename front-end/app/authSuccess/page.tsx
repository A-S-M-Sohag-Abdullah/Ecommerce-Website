"use client";

import { getUser } from "@/features/auth/authSlice";
import { store } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AuthSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      const token = searchParams.get("token");

      if (token) localStorage.setItem("token", token);
      await store.dispatch(getUser()).unwrap();
      
      setTimeout(() => {
        router.push("/");
      }, 2000);
    };
    init();
    toast("Successfully Signed In", { autoClose: 1000 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-red-400 text-6xl ">Auth Success</h1>
    </div>
  );
}
