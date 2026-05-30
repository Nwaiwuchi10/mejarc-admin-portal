"use client";

import { Search } from "lucide-react";

interface UserFiltersProps {
  searchQuery: string;
  statusFilter: string;
  roleFilter?: string;
  showRoleFilter?: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange?: (value: string) => void;
}

export default function UserFilters({
  searchQuery,
  statusFilter,
  roleFilter,
  showRoleFilter,
  onSearchChange,
  onStatusChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users..."
          className="w-full sm:w-64 rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2 text-sm text-[#1a1a2e] placeholder-gray-500 outline-none transition focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-[#1a1a2e] outline-none transition focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] shadow-sm font-medium"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Disabled">Disabled</option>
          <option value="Suspended">Suspended</option>
        </select>

        {showRoleFilter && (
          <select
            value={roleFilter}
            onChange={(e) => onRoleChange?.(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-[#1a1a2e] outline-none transition focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] shadow-sm font-medium animate-in fade-in slide-in-from-left-2 duration-200"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Support">Support</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
          </select>
        )}
      </div>
    </div>
  );
}