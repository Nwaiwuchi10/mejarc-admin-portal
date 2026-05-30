"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import UserTabs from "@/src/app/admin/users/components/UserTabs";
import UserFilters from "@/src/app/admin/users/components/UserFilters";
import UserTable from "@/src/app/admin/users/components/UserTable";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Disabled";
  userType: string;
  verification: "Verified" | "Pending" | "Failed";
  lastLogin: string;
};

const users: User[] = [
  { id: 1, name: "John Smith Roland", email: "john@example.com", role: "Project Manager", userType: "Customers", verification: "Verified", status: "Active", lastLogin: "Feb 6, 2026" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Agent", userType: "Agents", verification: "Pending", status: "Active", lastLogin: "Jan 30, 2026" },
  { id: 3, name: "Aisha Bello", email: "aisha@example.com", role: "Staff", userType: "Staff", verification: "Failed", status: "Disabled", lastLogin: "Feb 6, 2026" },
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesTab =
        activeTab === "All Users" || user.userType === activeTab;

      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesTab && matchesSearch && matchesStatus;
    });
  }, [activeTab, searchQuery, statusFilter]);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full p-4 sm:p-5 lg:p-6">

        {/* Tabs + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

          {/* Tabs (scrollable on mobile) */}
          <div className="w-full overflow-x-auto">
            <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Filters */}
          <div className="w-full lg:w-auto">
            <UserFilters
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onSearchChange={setSearchQuery}
              onStatusChange={setStatusFilter}
            />
          </div>

        </div>

        {/* Table */}
        <UserTable users={filteredUsers} />

      </div>
    </AdminLayout>
  );
}