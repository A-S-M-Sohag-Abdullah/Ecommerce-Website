"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AccountSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside>
      <section className="mb-6">
        <h2 className="text-gray-700 font-bold mb-4">Manage My Account</h2>
        <ul className="space-y-2 ms-5">
          <li>
            <Link
              href="/account"
              className={`block font-medium ${
                isActive("/account")
                  ? "text-red-400"
                  : "text-gray-600 hover:text-red-400"
              }`}
            >
              My Profile
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-gray-700 font-bold mb-4">My Orders</h2>
        <ul className="space-y-2 ms-5">
          <li>
            <Link
              href="/account/my-orders"
              className={`block font-medium ${
                isActive("/account/my-orders")
                  ? "text-red-400"
                  : "text-gray-600 hover:text-red-400"
              }`}
            >
              My Orders
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-gray-700 font-bold mb-4">My Wishlist</h2>
        <ul className="space-y-2 ms-5">
          <li>
            <Link
              href="/account/my-favourites"
              className={`block font-medium ${
                isActive("/account/my-favourites")
                  ? "text-red-400"
                  : "text-gray-600 hover:text-red-400"
              }`}
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default AccountSidebar;
