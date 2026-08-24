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
    try {
      const results = await Promise.allSettled([
        reportService.getSummary(),
        reportService.getPerformance(),
        reportService.getRevenueChart(),
        reportService.getTopAgents(),
        reportService.getCustomerActivity(),
      ]);

      const [summaryRes, perfRes, revRes, topRes, actRes] = results;

      if (summaryRes.status === "fulfilled" && summaryRes.value) {
        setSummary(summaryRes.value);
      }
      if (perfRes.status === "fulfilled" && perfRes.value) {
        setPerformance(perfRes.value);
      }
      if (revRes.status === "fulfilled" && revRes.value?.data) {
        setRevenueData(revRes.value.data);
      }
      if (topRes.status === "fulfilled" && topRes.value?.data) {
        setTopAgents(topRes.value.data);
      }
      if (actRes.status === "fulfilled" && actRes.value?.data) {
        setActivity(actRes.value.data);
      }
    } catch (err) {
      console.error("Error fetching reports data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="space-y-6 p-4 md:p-6">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <>
              {/* ── 1. Top Financial KPI Summary Cards ── */}
              <div className="w-full overflow-hidden">
                <StatsCards summary={summary} />
              </div>

              {/* ── 2. Performance & Top Agent Row ── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 min-w-0">
                  <Performance data={performance} />
                </div>

                <div className="lg:col-span-1 min-w-0">
                  <TopAgent agents={topAgents} />
                </div>
              </div>

              {/* ── 3. Monthly Revenue Analytics Chart ── */}
              <div className="w-full min-w-0 overflow-hidden">
                <RevenueChart data={revenueData} />
              </div>

              {/* ── 4. Customer Activity & Platform Events ── */}
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