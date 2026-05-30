"use client";

import { Search } from "lucide-react";

interface UserFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function UserFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: UserFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users..."
          className="w-64 rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2 text-sm text-[#1a1a2e] placeholder-gray-400 outline-none transition focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1a1a2e] outline-none transition focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]"
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Disabled">Disabled</option>
      </select>
    </div>
  );
}