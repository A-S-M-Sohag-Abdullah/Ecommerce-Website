"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      router.replace(`/?redirect=${pathname}`);
    }
  }, [user, pathname, router]);

  if (user) return null; // or a loading spinner
  return <>{children}</>;
}
