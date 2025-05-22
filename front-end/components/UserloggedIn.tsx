"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

type userType = {
  name: string;
  email: string;
};

const UserloggedIn = () => {
  const auth = useSelector(
    (state: RootState) => state.auth as { user: userType | null }
  );
  const router = useRouter();

  useEffect(() => {
    
  }, [auth.user]);

  return <div>{auth.user ? auth.user?.name : "login"}</div>;
};

export default UserloggedIn;
