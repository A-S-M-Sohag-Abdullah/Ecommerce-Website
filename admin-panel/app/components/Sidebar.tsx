"use client";

import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", src: "/icons/dashboard.svg" },
    { label: "Orders", src: "/icons/orders.svg", badge: 16 },
    { label: "Products", src: "/icons/products.svg" },
    { label: "Categories", src: "/icons/categories.svg" },
    { label: "Customers", src: "/icons/customers.svg" },
    { label: "Reports", src: "/icons/reports.svg" },
    { label: "Coupons", src: "/icons/coupons.svg" },
    { label: "Inbox", src: "/icons/inbox.svg" },
  ];

/*   const otherInfo = [
    { label: "Knowledge Base", src: "/icons/knowledge.svg" },
    { label: "Product Updates", src: "/icons/updates.svg" },
  ];

  const settings = [
    { label: "Personal Settings", src: "/icons/personal.svg" },
    { label: "Global Settings", src: "/icons/global.svg" },
  ];
 */
  return (
    <aside className="bg-[#1E2753] text-white w-64 min-h-screen p-4 space-y-6 text-sm">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href="/"
            className="group flex items-center justify-between px-3 py-2 hover:bg-[#FFFFFF] hover:text-[#5A607F] rounded-md font-medium"
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.src}
                alt={item.label}
                width={20}
                height={20}
                className="brightness-200 contrast-200 group-hover:brightness-0 group-hover:contrast-0"
              />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-white text-black text-xs rounded-full px-2 py-0.5 font-semibold">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* <div>
        <h4 className="text-gray-400 text-xs px-3 mb-2">Other Information</h4>
        <div className="space-y-2">
          {otherInfo.map((item) => (
            <Link
              key={item.label}
              href="/"
              className="flex items-center gap-3 px-3 py-2 hover:bg-[#FFFFFF] hover:text-[#5A607F] rounded-md"
            >
              <Image src={item.src} alt={item.label} width={20} height={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-xs px-3 mb-2">Settings</h4>
        <div className="space-y-2">
          {settings.map((item) => (
            <Link
              key={item.label}
              href="/"
              className="flex items-center gap-3 px-3 py-2 hover:bg-[#FFFFFF] hover:text-[#5A607F] rounded-md"
            >
              <Image src={item.src} alt={item.label} width={20} height={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
