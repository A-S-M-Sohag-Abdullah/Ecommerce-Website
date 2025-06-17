"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import { logout } from "@/features/auth/authSlice";

type userType = {
  name: string;
  email: string;
};
const UserLoggedIn = () => {
  const auth = useSelector(
    (state: RootState) => state.auth as { user: userType | null }
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      // handle error if needed
    }
  };

  if (!auth.user) {
    return (
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-red-400 text-white rounded"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        {auth.user.name}
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
          <Link
            href="/account"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setShowMenu(false)}
          >
            My Account
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLoggedIn;
