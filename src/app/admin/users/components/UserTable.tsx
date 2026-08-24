"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  ShieldCheck,
  UserX,
  UserCheck,
  Eye,
  Mail,
  Phone,
  Calendar,
  User as UserIcon,
  X,
  ClipboardList,
} from "lucide-react";
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
  phoneNumber?: string;
  avatar?: string;
  createdAt?: string;
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
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Disabled: "bg-red-100 text-red-700",
  Suspended: "bg-red-100 text-red-700",
};

type ConfirmModal = {
  title: string;
  description: string;
  confirmLabel: string;
  confirmClass: string;
  onConfirm: () => void;
} | null;

interface MenuCoords {
  top: number;
  right: number;
  isUp: boolean;
}

export default function UserTable({ users, onRefresh }: UserTableProps) {
  const [activeMenuUser, setActiveMenuUser] = useState<User | null>(null);
  const [menuCoords, setMenuCoords] = useState<MenuCoords | null>(null);

  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);
  const [selectedDetailsUser, setSelectedDetailsUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuUser(null);
        setMenuCoords(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on table scroll or window resize to prevent detached popups
  useEffect(() => {
    const handleScrollOrResize = () => {
      if (activeMenuUser) {
        setActiveMenuUser(null);
        setMenuCoords(null);
      }
    };
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [activeMenuUser]);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, user: User) => {
    e.stopPropagation();
    if (activeMenuUser?.id === user.id) {
      setActiveMenuUser(null);
      setMenuCoords(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const isUp = spaceBelow < 210; // If less than 210px below, pop upward

    setMenuCoords({
      top: isUp ? rect.top - 8 : rect.bottom + 8,
      right: Math.max(16, window.innerWidth - rect.right),
      isUp,
    });
    setActiveMenuUser(user);
  };

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openConfirm = (opts: Omit<ConfirmModal & object, "never">) => {
    setActiveMenuUser(null);
    setMenuCoords(null);
    setConfirmModal(opts as ConfirmModal);
  };

  const handleSuspend = (user: User) => {
    openConfirm({
      title: "Suspend Account",
      description: `Are you sure you want to suspend ${user.name}? They will lose access to their account immediately.`,
      confirmLabel: "Suspend Account",
      confirmClass: "bg-red-600 hover:bg-red-700 text-white",
      onConfirm: async () => {
        setActionLoading(true);
        const res = await userService.suspendUser(user.id.toString());
        setActionLoading(false);
        setConfirmModal(null);
        if (res?.success !== false) {
          showToast("success", `${user.name} suspended successfully.`);
          onRefresh?.();
        } else {
          showToast("error", res?.message || "Failed to suspend.");
        }
      },
    });
  };

  const handleActivate = (user: User) => {
    openConfirm({
      title: "Activate Account",
      description: `Activate ${user.name}'s account? They will regain full access.`,
      confirmLabel: "Activate Account",
      confirmClass: "bg-green-600 hover:bg-green-700 text-white",
      onConfirm: async () => {
        setActionLoading(true);
        const res = await userService.activateUser(user.id.toString());
        setActionLoading(false);
        setConfirmModal(null);
        if (res?.success !== false) {
          showToast("success", `${user.name} activated successfully.`);
          onRefresh?.();
        } else {
          showToast("error", res?.message || "Failed to activate.");
        }
      },
    });
  };

  const handleMakeAdmin = (user: User) => {
    openConfirm({
      title: "Grant Admin Privileges",
      description: `Grant admin privileges to ${user.name}? This gives them full access to manage the platform.`,
      confirmLabel: "Confirm Make Admin",
      confirmClass: "bg-[#1a1a2e] hover:bg-[#16213e] text-white",
      onConfirm: async () => {
        setActionLoading(true);
        const res = await userService.makeAdmin(user.id.toString());
        setActionLoading(false);
        setConfirmModal(null);
        if (res?.success !== false) {
          showToast("success", `${user.name} is now an admin.`);
          onRefresh?.();
        } else {
          showToast("error", res?.message || "Failed to make admin.");
        }
      },
    });
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[350] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all animate-in slide-in-from-bottom-4 duration-300 ${
            toastMsg.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toastMsg.type === "success" ? "✓" : "✕"} {toastMsg.text}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[320] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 w-full max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-base sm:text-lg font-bold text-[#1a1a2e] mb-2">{confirmModal.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 leading-relaxed">
              {confirmModal.description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                disabled={actionLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  confirmModal.confirmClass
                } ${actionLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {actionLoading ? "Processing..." : confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedDetailsUser && (
        <div className="fixed inset-0 z-[320] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#1a1a2e] m-0">User Profile Details</h3>
              <button
                onClick={() => setSelectedDetailsUser(null)}
                className="text-gray-400 hover:text-gray-600 font-bold border-0 bg-transparent cursor-pointer p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-black text-xl shadow-sm flex-shrink-0">
                {selectedDetailsUser.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold text-[#1a1a2e] m-0 truncate">
                  {selectedDetailsUser.name}
                </h4>
                <p className="text-xs text-gray-500 m-0 mt-0.5 truncate">{selectedDetailsUser.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                    {selectedDetailsUser.userType || "Customer"}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      statusColors[selectedDetailsUser.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {selectedDetailsUser.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 text-xs text-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Mail size={13} /> Email:
                </span>
                <span className="font-semibold text-[#1a1a2e]">{selectedDetailsUser.email}</span>
              </div>
              {selectedDetailsUser.phoneNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Phone size={13} /> Phone:
                  </span>
                  <span className="font-semibold text-[#1a1a2e]">
                    {selectedDetailsUser.phoneNumber}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <UserIcon size={13} /> Verification:
                </span>
                <span className="font-bold text-blue-600">
                  {selectedDetailsUser.verification || "Unverified"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Calendar size={13} /> Last Login:
                </span>
                <span className="font-semibold text-gray-700">
                  {selectedDetailsUser.lastLogin || "Never"}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDetailsUser(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#1a1a2e] hover:bg-[#2a2a4e] rounded-xl border-0 cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── IMMUNE TO CLIPPING: Fixed Popover Dropdown ── */}
      {activeMenuUser && menuCoords && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            right: `${menuCoords.right}px`,
            ...(menuCoords.isUp
              ? { bottom: `${window.innerHeight - menuCoords.top}px` }
              : { top: `${menuCoords.top}px` }),
          }}
          className="z-[300] w-52 bg-white border border-gray-200 rounded-2xl shadow-2xl py-1.5 text-xs text-left animate-in fade-in zoom-in-95 duration-150"
        >
          {/* View Details */}
          <button
            type="button"
            onClick={() => {
              setSelectedDetailsUser(activeMenuUser);
              setActiveMenuUser(null);
              setMenuCoords(null);
            }}
            className="w-full px-3.5 py-2.5 text-left text-gray-700 hover:bg-gray-50 font-semibold flex items-center gap-2.5 border-0 bg-transparent cursor-pointer transition-colors"
          >
            <Eye size={14} className="text-gray-400" />
            View Details
          </button>

          {/* If Agent: Link to KYC Applications */}
          {(activeMenuUser.userType === "Agent" || activeMenuUser.role === "Agent") && (
            <Link
              href="/admin/users/agent-applications"
              onClick={() => {
                setActiveMenuUser(null);
                setMenuCoords(null);
              }}
              className="w-full px-3.5 py-2.5 text-left text-purple-700 hover:bg-purple-50 font-semibold flex items-center gap-2.5 border-0 no-underline transition-colors block"
            >
              <ClipboardList size={14} className="text-purple-500" />
              KYC Documents
            </Link>
          )}

          {/* Suspend or Activate Account */}
          {activeMenuUser.status !== "Suspended" && activeMenuUser.status !== "Disabled" ? (
            <button
              type="button"
              onClick={() => handleSuspend(activeMenuUser)}
              className="w-full px-3.5 py-2.5 text-left text-red-600 hover:bg-red-50 font-bold flex items-center gap-2.5 border-0 bg-transparent cursor-pointer transition-colors"
            >
              <UserX size={14} />
              Suspend Account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleActivate(activeMenuUser)}
              className="w-full px-3.5 py-2.5 text-left text-green-600 hover:bg-green-50 font-bold flex items-center gap-2.5 border-0 bg-transparent cursor-pointer transition-colors"
            >
              <UserCheck size={14} />
              Activate Account
            </button>
          )}

          {/* Make Admin */}
          {activeMenuUser.role !== "admin" && activeMenuUser.role !== "ADMIN" && (
            <button
              type="button"
              onClick={() => handleMakeAdmin(activeMenuUser)}
              className="w-full px-3.5 py-2.5 text-left text-[#1a1a2e] hover:bg-[#FFC700]/10 font-bold flex items-center gap-2.5 border-0 bg-transparent cursor-pointer transition-colors"
            >
              <ShieldCheck size={14} className="text-[#FFC700]" />
              Make Admin
            </button>
          )}
        </div>
      )}

      {/* Main Table Container */}
      <div className="w-full rounded-2xl border border-[#e6e8f2] bg-white shadow-sm overflow-hidden">
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
                  <td colSpan={7} className="px-4 py-16 text-center text-gray-500 font-medium">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, i) => {
                  const isMenuOpen = activeMenuUser?.id === user.id;

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 md:px-6 md:py-4 text-[#1a1a2e] font-medium">{i + 1}</td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-bold text-xs flex-shrink-0 shadow-sm">
                            {user.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#1a1a2e]">{user.name}</span>
                            <span className="text-[11px] text-gray-500">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#1a1a2e]/8 text-[#1a1a2e]">
                          {user.userType || "Customer"}
                        </span>
                      </td>
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
                            statusColors[user.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 text-gray-500 font-medium">
                        {user.lastLogin || "Never"}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                        <button
                          onClick={(e) => handleOpenMenu(e, user)}
                          className={`p-2 rounded-xl transition-colors border-0 bg-transparent cursor-pointer inline-flex items-center justify-center ${
                            isMenuOpen
                              ? "bg-[#1a1a2e] text-white"
                              : "text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100"
                          }`}
                          title="Actions"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}