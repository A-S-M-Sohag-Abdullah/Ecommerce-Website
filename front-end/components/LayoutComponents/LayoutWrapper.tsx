"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/LayoutComponents/Header";
import Footer from "@/components/LayoutComponents/Footer";
import { ToastContainer  } from "react-toastify";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define paths that should NOT use header/footer
  const noLayoutPaths = ["/authSuccess"];

  const hideLayout = noLayoutPaths.includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main>
        {children} <ToastContainer />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
