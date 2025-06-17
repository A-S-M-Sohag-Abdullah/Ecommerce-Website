"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { register } from "@/features/auth/authSlice";
import { googleLoginUser } from "@/api/authApi";

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })).unwrap();
      // Redirect or notify success here
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Register failed:", err.message);
      } else {
        console.log("Register failed:", err);
      }
    }
  };

  const handleGoogleLogin = async () => {
    googleLoginUser();
  };

  return (
    <form className="flex flex-col w-md" onSubmit={handleSubmit}>
      <h1 className="text-3xl mb-2 font-medium">Create an account</h1>
      <p className="text-md mb-7 font-medium">Enter your details below</p>

      <input
        type="text"
        placeholder="Name"
        className="p-2 border-b mb-9 focus:outline-0"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email or Phone Number"
        className="p-2 border-b mb-9 focus:outline-0"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="p-2 border-b mb-9 focus:outline-0"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="p-4 w-full bg-red-400 text-white text-xl rounded-sm mb-3 cursor-pointer">
        Create Account
      </button>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="border border-gray-500 p-4 flex justify-center items-center gap-2 rounded-sm cursor-pointer"
      >
        <Image src="/google.png" alt="Google Logo" width={20} height={20} />
        Sign in With Google
      </button>

      <p className="flex justify-center mt-6">
        Already have an account?
        <Link href="/auth/login" className="border-b ms-1">
          Login
        </Link>
      </p>
    </form>
  );
}
