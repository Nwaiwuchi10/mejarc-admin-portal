"use client";

import { useState, useEffect } from "react";
import StatsCards from "./components/StatsCards";
import TabsBar from "./components/TabsBar";
import TransactionsTable from "./components/TransactionsTable";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { financialService } from "@/src/services/financialService";

export default function Financials() {
  const [activeTab, setActiveTab] = useState("Customer Transactions");
  const [stats, setStats] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchStats = async () => {
    const res = await financialService.getStats();
    if (res) setStats(res);
  };

  const fetchTabData = async () => {
    setLoading(true);
    let res: any;
    
    // Ensure all financial logic is backend-driven and captured correctly
    switch (activeTab) {
      case "Customer Transactions":
        // This endpoint returns all marketplace and project-related customer payments
        res = await financialService.getTransactions({ type: "customer" });
        break;
      case "Agent Payouts":
        // This endpoint captures both pending and completed agent payments
        res = await financialService.getPayouts();
        break;
      case "Disputes":
        // Tracking financial disputes and conflicts
        res = await financialService.getDisputes();
        break;
      case "Refunds":
        // Capturing refund statuses and issues
        res = await financialService.getRefunds();
        break;
      default:
        res = { data: [] };
    }
    
    if (res && res.data) {
      setData(res.data);
    } else if (Array.isArray(res)) {
       setData(res);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden bg-gray-50">
        <div className="space-y-6 p-4 md:p-6">
          <StatsCards stats={stats} />

          <TabsBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <TransactionsTable activeTab={activeTab} data={data} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}