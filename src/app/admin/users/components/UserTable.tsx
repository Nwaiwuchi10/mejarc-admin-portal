"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { userService } from "@/src/services/userService";

type User = {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Disabled" | "Suspended";
  userType: string;
  verification: "Verified" | "Pending" | "Failed";
  lastLogin: string;
  avatar?: string;
};

interface UserTableProps {
  users: User[];
  onRefresh?: () => void;
}

const verificationColors = {
  Verified: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-gray-100 text-gray-700",
};

const statusColors: any = {
  Active: "bg-green-500 text-white",
  Pending: "bg-yellow-500 text-white",
  Disabled: "bg-red-500 text-white",
  Suspended: "bg-red-500 text-white",
};

export default function UserTable({ users, onRefresh }: UserTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId !== null &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  const handleAction = async (action: string, user: User) => {
    setOpenDropdownId(null);
    if (action === "Suspend Account") {
      await userService.suspendUser(user.id.toString());
      onRefresh?.();
    } else if (action === "Activate Account") {
      await userService.activateUser(user.id.toString());
      onRefresh?.();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full rounded-xl border border-[#e6e8f2] bg-white shadow-sm"
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[13px] md:text-sm">
          <thead className="bg-[#1a1a2e] text-white">
            <tr>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium">No.</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium">NAME</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium">USER TYPE</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium">VERIFICATION</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium">STATUS</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium">LAST LOGIN</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-medium text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 md:px-6 md:py-4 text-[#1a1a2e] font-medium">{i + 1}</td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-bold text-xs flex-shrink-0 shadow-sm">
                        {user.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1a1a2e]">{user.name}</span>
                        <span className="text-[11px] text-gray-600">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-gray-700 font-medium">{user.userType || "N/A"}</td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        verificationColors[user.verification] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.verification || "Unverified"}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        statusColors[user.status] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-gray-600 font-medium">{user.lastLogin || "Never"}</td>
                  <td className="px-4 py-3 md:px-6 md:py-4 relative text-right">
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                      className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {openDropdownId === user.id && (
                      <div className="absolute right-6 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <ul className="py-1 list-none m-0 p-0 text-left">
                          <li>
                            <button
                              onClick={() => handleAction("View Profile", user)}
                              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              View Profile
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleAction("Suspend Account", user)}
                              className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                            >
                              Suspend Account
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleAction("Activate Account", user)}
                              className="block w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 transition-colors font-medium"
                            >
                              Activate Account
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}