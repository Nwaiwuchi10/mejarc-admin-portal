"use client";

import { useState, useEffect } from "react";
import MarketTable from "./components/MarketTable";
import MarketStats from "./components/MarketStats";
import MarketTabs from "./components/MarketTabs";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { marketplaceService } from "@/src/services/marketplaceService";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("Building Plan");
  const [status, setStatus] = useState("All");
  const [stats, setStats] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [activeTab, status]);

  const fetchStats = async () => {
    const res = await marketplaceService.getStats();
    if (res) setStats(res);
  };

  const fetchListings = async () => {
    setLoading(true);
    const res = await marketplaceService.getListings({
      type: activeTab,
      status: status === "All" ? undefined : status
    });
    if (res.data) setListings(res.data);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full text-[#4a4a4a] overflow-x-hidden">
        <div className="space-y-6 p-4 md:p-6">
          <div className="w-full max-w-full overflow-hidden">
            <MarketStats stats={stats} />
          </div>

          <div className="w-full max-w-full overflow-hidden">
            <MarketTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
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
              <MarketTable
                listings={listings}
                activeTab={activeTab}
                status={status}
                onRefresh={() => {
                  fetchListings();
                  fetchStats();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}