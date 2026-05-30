"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const items = [
    { name: "My Profile", path: "/admin/settings" },
    { name: "General Settings", path: "/admin/settings/pages/general" },
    { name: "Client", path: "/admin/settings/pages/client" },
    { name: "Payment settings", path: "/admin/settings/pages/payment" },
    { name: "Security settings", path: "/admin/settings/pages/security" },
    { name: "Backup", path: "/admin/settings/pages/backup" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-2">
      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link key={item.path} href={item.path}>
            <div
              className={`px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition
                ${
                  isActive
                    ? "bg-yellow-500 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}