"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import StatsCards from "./components/StatsCard";
import TabsBar from "./components/TabsBar";
import ProjectsTable from "./components/ProjectsTable";
import { projectService } from "@/src/services/projectService";

export default function ProjectOversightPage() {
  const [activeTab, setActiveTab] = useState("Customers");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [stats, setStats] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchTabData();
  }, [activeTab, search, status]);

  const fetchStats = async () => {
    const res = await projectService.getStats();
    if (res) setStats(res);
  };

  const fetchTabData = async () => {
    setLoading(true);
    let res: any;
    const params = {
      search: search || undefined,
      status: status === "All" ? undefined : status
    };

    switch (activeTab) {
      case "Customers":
        res = await projectService.getCustomerProjects(params);
        break;
      case "Agents":
        res = await projectService.getAgentPerformance(params);
        break;
      case "Custom Projects":
        res = await projectService.getCustomProjects(params);
        break;
      default:
        res = { data: [] };
    }
    if (res.data) setData(res.data);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="space-y-6 p-4 md:p-6">
          <div className="w-full max-w-full overflow-hidden">
            <StatsCards stats={stats} />
          </div>

          <div className="w-full max-w-full overflow-hidden">
            <TabsBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
            />
          </div>

          <div className="w-full max-w-full">
            {loading ? (
              <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ProjectsTable
                activeTab={activeTab}
                data={data}
                search={search}
                status={status}
              />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}