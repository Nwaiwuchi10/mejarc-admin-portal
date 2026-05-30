"use client";

import { useState } from "react";
import StatCard from "./components/StatCard";
import RolesTabs from "./components/RolesTabs";
import RolesTable from "./components/RolesTable";
import PermissionMatrix from "./components/PermissionMatrix";
import StaffAssignment from "./components/StaffAssignment";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";

const roles = [
  {
    name: "Super Admin",
    dept: "Executive",
    users: 1,
    permissions: "Full System Access",
    date: "Jan 10, 2024",
  },
  {
    name: "Project Manager",
    dept: "Operations",
    users: 6,
    permissions: "Manage Projects, Assign Agents",
    date: "Jan 15, 2024",
  },
  {
    name: "Finance Manager",
    dept: "Finance",
    users: 3,
    permissions: "Transactions, Refunds, Payouts",
    date: "Jan 20, 2024",
  },
  {
    name: "Support Manager",
    dept: "Customer Support",
    users: 5,
    permissions: "Handle Disputes, Customer Issues",
    date: "Feb 02, 2024",
  },
];

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState("Roles");

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* ===== TITLE ===== */}
        <h1 className="text-xl font-semibold text-gray-900">
          Roles & Permissions
        </h1>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Roles" value="6" />
          <StatCard title="Active Staff" value="24" />
          <StatCard title="Departments Covered" value="5" />
          <StatCard title="Custom Roles Created" value="2" />
        </div>

        {/* ===== TABS ===== */}
        <RolesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* ===== CONTENT SWITCH ===== */}
        {activeTab === "Roles" && (
          <RolesTable roles={roles} />
        )}

        {activeTab === "Staff Assignment" && (
          <StaffAssignment />
        )}

        {activeTab === "Permission Matrix" && (
          <PermissionMatrix />
        )}
        

      </div>
    </AdminLayout>
  );
}