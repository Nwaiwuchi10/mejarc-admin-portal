"use client";

import { useState, useEffect } from "react";
import StatsCards from "./components/StatsCards";
import TabsBar from "./components/TabsBar";
import TransactionsTable from "./components/TransactionsTable";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { financialService } from "@/src/services/financialService";
import Link from "next/link";
import { Sliders, ArrowRight } from "lucide-react";

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

    switch (activeTab) {
      case "Customer Transactions":
        res = await financialService.getTransactions({ type: "customer" });
        break;
      case "Agent Payouts":
        res = await financialService.getPayouts();
        break;
      case "Disputes":
        res = await financialService.getDisputes();
        break;
      case "Refunds":
        res = await financialService.getRefunds();
        break;
      case "Vendor Withdrawals":
        res = await financialService.getVendorWithdrawals();
        break;
      default:
        res = { data: [] };
    }

    if (res && res.data) {
      if (activeTab === "Vendor Withdrawals" && res.data.vendorSummary) {
        setData(res.data.vendorSummary);
      } else {
        setData(res.data);
      }
    } else if (Array.isArray(res)) {
      setData(res);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const handleRefreshAll = () => {
    fetchStats();
    fetchTabData();
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden bg-gray-50">
        <div className="space-y-6 p-4 md:p-6">
          <StatsCards stats={stats} />

          {/* Quick Header Banner linking to Financial Settings */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1a1a2e] text-[#FFC700] flex items-center justify-center font-bold">
                <Sliders size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1a1a2e] m-0">Vendor Payouts &amp; Withdrawal System</h3>
                <p className="text-xs text-gray-500 m-0">Manage Auto/Manual withdrawal modes, Paystack transfers, and threshold limits</p>
              </div>
            </div>
            <Link
              href="/admin/financial-settings"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white text-xs font-bold rounded-xl transition-colors no-underline self-start sm:self-auto shadow-sm"
            >
              <span>Financial Settings</span>
              <ArrowRight size={14} className="text-[#FFC700]" />
            </Link>
          </div>

          <TabsBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <TransactionsTable
              activeTab={activeTab}
              data={data}
              onRefresh={handleRefreshAll}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}