"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // adjust path if needed

const Navbar = () => {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Shop", href: "/products" }, // You can make this a dropdown later
    {
      label: user ? "Checkout" : "Sign Up",
      href: user ? "/checkout" : "/auth/signup",
    },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <nav>
      <ul className="flex [&>li:hover]:text-red-500 [&>li]:font-semibold [&>li]:text-black">
        {navItems.map(({ label, href }) => (
          <li key={label} className={`px-3 font-medium `}>
            <Link
              href={href}
              className={`${pathname === href ? "text-red-500" : ""}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
