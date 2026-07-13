"use client";

import { useState, useEffect } from "react";
import StatsCards from "./components/StatsCards";
import Performance from "./components/Performance";
import RevenueChart from "./components/RevenueChart";
import TopAgent from "./components/TopAgent";
import CustomerActivity from "./components/CustomerActivity";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { reportService } from "@/src/services/reportService";

export default function Reports() {
  const [summary, setSummary] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [topAgents, setTopAgents] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [summaryRes, perfRes, revRes, topRes, actRes] = await Promise.all([
      reportService.getSummary(),
      reportService.getPerformance(),
      reportService.getRevenueChart(),
      reportService.getTopAgents(),
      reportService.getCustomerActivity()
    ]);

    if (summaryRes) setSummary(summaryRes);
    if (perfRes) setPerformance(perfRes);
    if (revRes.data) setRevenueData(revRes.data);
    if (topRes.data) setTopAgents(topRes.data);
    if (actRes.data) setActivity(actRes.data);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="space-y-6 p-4 md:p-6">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="w-full overflow-hidden">
                <StatsCards summary={summary} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3 min-w-0">
                  <Performance data={performance} />
                </div>

                <div className="xl:col-span-1 min-w-0">
                  <RevenueChart data={revenueData} />
                </div>

                <div className="xl:col-span-3 min-w-0">
                  <TopAgent agents={topAgents} />
                </div>
              </div>

              <div className="w-full min-w-0 overflow-hidden">
                <CustomerActivity activity={activity} summary={summary} />
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}