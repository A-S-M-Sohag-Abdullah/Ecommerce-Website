"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { register } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("hi");
      const res = await dispatch(register({ name, email, password })).unwrap();
      console.log("Register success:", res);
      //router.push("/profile");
    } catch (err: any) {
      console.log("Register failed:", err.message || err);
    }
  };
  return (
    <form action="" className="flex flex-col w-md" onSubmit={handleSubmit}>
      <h1 className="text-3xl mb-2 font-medium">Create an account</h1>
      <p className="text-md mb-7 font-medium">Enter your details below</p>

      <input
        type="text"
        placeholder="Name"
        className="p-2 border-b mb-9 focus:outline-0"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border-b mb-9 focus:outline-0"
      />

      <button className="p-4 w-full bg-red-400 text-white text-xl rounded-sm mb-3 cursor-pointer">
        Create Account
      </button>
      <button className="border border-gray-500 p-4 flex justify-center rounded-sm cursor-pointer">
        {" "}
        <img src="/google.png" alt="" className="me-1" /> Sign in With Google
      </button>

      <p className="flex justify-center mt-6">
        Already have account?
        <Link href="/auth/login" className="border-b ms-1">
          Login
        </Link>
      </p>
    </form>
  );
}
