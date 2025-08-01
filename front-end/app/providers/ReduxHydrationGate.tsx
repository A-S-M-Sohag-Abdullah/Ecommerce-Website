// app/providers/ReduxHydrationGate.tsx
"use client";

import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getUser } from "@/features/auth/authSlice";

export default function ReduxHydrationGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("here");
        await store.dispatch(getUser()).unwrap();
      } catch (err) {
        console.log("Token invalid", err);
      }
      setReady(true); // Whether token is valid or not, mark as ready
    };

    init();
  }, []);

  if (!ready) return;
  return <>{children}</>;
}
