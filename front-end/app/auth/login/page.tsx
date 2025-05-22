"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(login({ email, password })).unwrap();

      console.log("Login response:", res);
      router.push("/");
    } catch (err: any) {
      console.log("Login failed:", err.message || err);
    }
  };
  return (
    <form action="" className="flex flex-col w-md" onSubmit={handleSubmit}>
      <h1 className="text-3xl mb-2 font-medium">Log in to Exclusive</h1>
      <p className="text-md mb-7 font-medium">Enter your details below</p>

      <input
        type="email"
        placeholder="Email or Phone Number"
        className="p-2 border-b mb-9 focus:outline-0"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name=""
        id=""
        placeholder="Password"
        className="p-2 border-b mb-9 focus:outline-0"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="p-4 w-full bg-red-400 text-white text-xl rounded-sm mb-3 cursor-pointer">
        Login
      </button>
      <a href="#" className="text-center text-red-400  mb-5">
        Forgot Password?
      </a>
      <button className="border border-gray-500 p-4 flex justify-center rounded-sm cursor-pointer">
        {" "}
        <img src="/google.png" alt="" className="me-1" /> Sign in With Google
      </button>

      <p className="flex justify-center mt-6">
        Register with your information?
        <Link href="/auth/signup" className="border-b ms-1">
          Signup
        </Link>
      </p>
    </form>
  );
}
