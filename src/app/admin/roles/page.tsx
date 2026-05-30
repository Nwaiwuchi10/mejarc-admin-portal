"use client";

import { useState, useEffect } from "react";
import StatCard from "./components/StatCard";
import RolesTabs from "./components/RolesTabs";
import RolesTable from "./components/RolesTable";
import PermissionMatrix from "./components/PermissionMatrix";
import StaffAssignment from "./components/StaffAssignment";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { roleService } from "@/src/services/roleService";

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState("Roles");
  const [stats, setStats] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [matrix, setMatrix] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchStats = async () => {
    const res = await roleService.getStats();
    if (res) setStats(res);
  };

  const fetchTabData = async () => {
    setLoading(true);
    if (activeTab === "Roles") {
      const res = await roleService.getRoles();
      if (res.data) setRoles(res.data);
    } else if (activeTab === "Staff Assignment") {
      const res = await roleService.getStaff();
      if (res.data) setStaff(res.data);
    } else if (activeTab === "Permission Matrix") {
      const res = await roleService.getPermissionMatrix();
      if (res) setMatrix(res);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Roles & Permissions
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Roles" value={stats?.totalRoles || "0"} />
          <StatCard title="Active Staff" value={stats?.activeStaff || "0"} />
          <StatCard title="Departments Covered" value={stats?.departmentsCovered || "0"} />
          <StatCard title="Custom Roles Created" value={stats?.customRolesCreated || "0"} />
        </div>

        <RolesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "Roles" && (
              <RolesTable roles={roles} />
            )}

            {activeTab === "Staff Assignment" && (
              <StaffAssignment staff={staff} />
            )}

            {activeTab === "Permission Matrix" && (
              <PermissionMatrix matrix={matrix} />
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}