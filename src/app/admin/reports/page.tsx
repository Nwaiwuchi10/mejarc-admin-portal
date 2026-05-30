"use client";

import StatsCards from "./components/StatsCards";
import Performance from "./components/Performance";
import RevenueChart from "./components/RevenueChart";
import TopAgent from "./components/TopAgent";
import CustomerActivity from "./components/CustomerActivity";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";

export default function Reports() {
  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden">

        <div className="space-y-6 p-4 md:p-6">

          {/* TOP STATS */}
          <div className="w-full overflow-hidden">
            <StatsCards />
          </div>

          {/* MIDDLE SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

            {/* PERFORMANCE */}
            <div className="xl:col-span-3 min-w-0">
              <Performance />
            </div>

            {/* REVENUE CHART */}
            <div className="xl:col-span-6 min-w-0">
              <RevenueChart />
            </div>

            {/* TOP AGENT */}
            <div className="xl:col-span-3 min-w-0">
              <TopAgent />
            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="w-full min-w-0 overflow-hidden">
            <CustomerActivity />
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}