"use client";

import { useState } from "react";
import StatsCards from "./components/StatsCards";
import TabsBar from "./components/TabsBar";
import TransactionsTable from "./components/TransactionsTable";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";

export default function Financials() {
  const [activeTab, setActiveTab] = useState("Customer Transactions");

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden bg-gray-50">
        
        <div className="space-y-6 p-4 md:p-6">
          <StatsCards />

          <TabsBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <TransactionsTable activeTab={activeTab} />
        </div>

      </div>
    </AdminLayout>
  );
}