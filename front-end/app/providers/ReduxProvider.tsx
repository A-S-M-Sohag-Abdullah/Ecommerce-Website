"use client";

import { Provider } from "react-redux";

import { store } from "@/store/store";
import { ReactNode } from "react";

import ReduxHydrationGate from "./ReduxHydrationGate";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  
  return (
    <Provider store={store}>
      {" "}
      <ReduxHydrationGate>{children}</ReduxHydrationGate>
    </Provider>
  );
}
