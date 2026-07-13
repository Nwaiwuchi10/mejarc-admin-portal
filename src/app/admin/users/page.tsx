"use client";

import { useMemo, useState, useEffect } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import UserTabs from "@/src/app/admin/users/components/UserTabs";
import UserFilters from "@/src/app/admin/users/components/UserFilters";
import UserTable from "@/src/app/admin/users/components/UserTable";
import { userService } from "@/src/services/userService";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, [activeTab, searchQuery, statusFilter, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    let params: any = {
      search: searchQuery,
      status: statusFilter === "All" ? undefined : statusFilter,
    };

    if (activeTab === "Customers") {
      params.tab = "Customers";
      params.userType = "Customer";
    } else if (activeTab === "Agents") {
      params.tab = "Agents";
      params.userType = "Agent";
      params.isApproved = true; // Only approved agents in the main User Management list
    } else if (activeTab === "Staff") {
      params.tab = "Staff";
      params.userType = "Staff";
      if (roleFilter !== "All") params.role = roleFilter;
    }

    const res = await userService.getUsers(params);
    
    if (res && res.data) {
      setUsers(res.data);
      setMeta(res.meta);
    } else {
      setUsers([]);
      setMeta(null);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full p-4 sm:p-5 lg:p-6">

        {/* Tabs + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

          {/* Tabs (scrollable on mobile) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="w-full overflow-x-auto">
              <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            
            <Link
              href="/admin/users/agent-applications"
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#2a2a4e] transition-all shadow-md shrink-0 whitespace-nowrap"
            >
              <ClipboardList size={18} className="text-[#FFC700]" />
              KYC Applications
            </Link>
          </div>

          {/* Filters */}
          <div className="w-full lg:w-auto">
            <UserFilters
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              roleFilter={roleFilter}
              showRoleFilter={activeTab === "Staff"}
              onSearchChange={setSearchQuery}
              onStatusChange={setStatusFilter}
              onRoleChange={setRoleFilter}
            />
          </div>

        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <UserTable users={users} />
        )}

      </div>
    </AdminLayout>
  );
}