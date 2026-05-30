"use client";

import { useState } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import StatsCards from "./components/StatsCard";
import TabsBar from "./components/TabsBar";
import ProjectsTable from "./components/ProjectsTable";

export default function ProjectOversightPage() {
  const [activeTab, setActiveTab] = useState("Customers");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden">

        <div className="space-y-6 p-4 md:p-6">

          {/* STATS */}
          <div className="w-full max-w-full overflow-hidden">
            <StatsCards />
          </div>

          {/* FILTERS/TABS */}
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

          {/* TABLE */}
          <div className="w-full max-w-full">
            <ProjectsTable
              activeTab={activeTab}
              search={search}
              status={status}
            />
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}