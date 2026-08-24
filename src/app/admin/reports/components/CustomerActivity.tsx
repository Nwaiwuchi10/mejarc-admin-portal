"use client";

import React, { useState } from "react";
import { Users, UserCheck, ShoppingBag, Activity, Search } from "lucide-react";

interface CustomerActivityProps {
  activity?: any[];
  summary?: any;
}

export default function CustomerActivity({ activity: propActivity, summary }: CustomerActivityProps) {
  const [search, setSearch] = useState("");
  const activityList = Array.isArray(propActivity) ? propActivity : [];

  const items = [
    {
      title: "Total Registered Users",
      value: summary?.totalUsers?.toString() || "0",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Agents / Vendors",
      value: summary?.totalAgents?.toString() || "0",
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Marketplace Listings",
      value: summary?.totalProducts?.toString() || "0",
      icon: ShoppingBag,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Recorded Order Events",
      value: activityList.length.toString(),
      icon: Activity,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const filtered = activityList.filter((item) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      item.customer?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.action?.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: any) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full overflow-hidden bg-white text-[#4a4a4a] p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#1a1a2e] m-0">Platform & Customer Activity</h3>
          <p className="text-xs text-gray-500 m-0 mt-0.5">Live log of real customer transactions and events</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer or event..."
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] transition-colors"
          />
        </div>
      </div>

      {/* SUMMARY STATS TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-gray-50/80 p-4 rounded-xl flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500 m-0 font-medium truncate">{item.title}</p>
                <h4 className="text-lg font-bold text-[#1a1a2e] m-0 mt-0.5">{item.value}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE ACTIVITY TABLE */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider m-0">Recent Event Log</h4>

        {filtered.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-xs bg-gray-50 rounded-xl">
            No customer activity matching your search
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Event Action</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.slice(0, 10).map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#1a1a2e]">{row.customer}</div>
                      {row.email && <div className="text-[11px] text-gray-400">{row.email}</div>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-700">{row.action}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1a1a2e]">
                      ₦{Number(row.amount || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === "Paid" || row.action?.includes("completed") || row.action?.includes("Payment")
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {row.status || "Completed"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500 whitespace-nowrap">
                      {formatDate(row.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}