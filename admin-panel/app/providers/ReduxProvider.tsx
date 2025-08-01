"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";



export default function ReduxProvider({ children }: { children: ReactNode }) {
  
  return (
    <Provider store={store}>
      {" "}
      {children}
      <ToastContainer />
    </Provider>
  );
}