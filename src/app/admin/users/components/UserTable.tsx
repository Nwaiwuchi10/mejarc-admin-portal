"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, ShieldCheck, UserX, UserCheck, ExternalLink } from "lucide-react";
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

export default function UserTable({ users, onRefresh }: UserTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
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

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openConfirm = (opts: Omit<ConfirmModal & object, "never">) => {
    setOpenDropdownId(null);
    setConfirmModal(opts as ConfirmModal);
  };

  const handleSuspend = (user: User) => {
    openConfirm({
      title: "Suspend Account",
      description: `Are you sure you want to suspend ${user.name}? They will lose access immediately.`,
      confirmLabel: "Suspend",
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
          showToast("error", res.message || "Failed to suspend.");
        }
      },
    });
  };

  const handleActivate = (user: User) => {
    openConfirm({
      title: "Activate Account",
      description: `Activate ${user.name}'s account? They will regain full access.`,
      confirmLabel: "Activate",
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
          showToast("error", res.message || "Failed to activate.");
        }
      },
    });
  };

  const handleMakeAdmin = (user: User) => {
    openConfirm({
      title: "Make Admin",
      description: `Grant admin privileges to ${user.name}? This gives them full system access.`,
      confirmLabel: "Confirm",
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
          showToast("error", res.message || "Failed to make admin.");
        }
      },
    });
  };

  return (
    <>
      {/* Toast */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all animate-in slide-in-from-bottom-4 duration-300 ${
            toastMsg.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toastMsg.type === "success" ? "✓" : "✕"} {toastMsg.text}
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{confirmModal.title}</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{confirmModal.description}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                disabled={actionLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${confirmModal.confirmClass} ${
                  actionLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {actionLoading ? "Processing..." : confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={wrapperRef} className="w-full rounded-xl border border-[#e6e8f2] bg-white shadow-sm">
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
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
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
                    <td className="px-4 py-3 md:px-6 md:py-4 relative text-right">
                      <button
                        onClick={() =>
                          setOpenDropdownId(openDropdownId === user.id ? null : user.id)
                        }
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      {openDropdownId === user.id && (
                        <div className="absolute right-6 top-full mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          <ul className="py-1.5 list-none m-0 p-0 text-left">
                            <li>
                              <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <ExternalLink size={14} className="text-gray-400" />
                                View Profile
                              </button>
                            </li>
                            {user.status !== "Suspended" && user.status !== "Disabled" ? (
                              <li>
                                <button
                                  onClick={() => handleSuspend(user)}
                                  className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                                >
                                  <UserX size={14} />
                                  Suspend Account
                                </button>
                              </li>
                            ) : (
                              <li>
                                <button
                                  onClick={() => handleActivate(user)}
                                  className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 transition-colors font-medium"
                                >
                                  <UserCheck size={14} />
                                  Activate Account
                                </button>
                              </li>
                            )}
                            {user.role !== "admin" && user.role !== "ADMIN" && (
                              <li>
                                <button
                                  onClick={() => handleMakeAdmin(user)}
                                  className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-[#1a1a2e] hover:bg-[#FFC700]/10 transition-colors font-semibold"
                                >
                                  <ShieldCheck size={14} className="text-[#FFC700]" />
                                  Make Admin
                                </button>
                              </li>
                            )}
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
    </>
  );
}