"use client";

import { useState } from "react";
import MarketTable from "./components/MarketTable";
import MarketStats from "./components/MarketStats";;
import MarketTabs from "./components/MarketTabs";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("Building Plan");
  const [status, setStatus] = useState("All");

  return (
  <AdminLayout>
    <div className="w-full max-w-full text-[#4a4a4a] overflow-x-hidden">
      
      <div className="space-y-6 p-4 md:p-6">
        
        {/* STATS */}
        <div className="w-full max-w-full overflow-hidden">
          <MarketStats />
        </div>

        {/* TABS + FILTER */}
        <div className="w-full max-w-full overflow-hidden">
          <MarketTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            status={status}
            setStatus={setStatus}
          />
        </div>

        {/* TABLE */}
        <div className="w-full max-w-full">
          <MarketTable
            activeTab={activeTab}
            status={status}
          />
        </div>

      </div>

    </div>
  </AdminLayout>
);
}