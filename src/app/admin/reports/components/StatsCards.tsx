"use client";

import React from "react";
import { DollarSign, CreditCard, ArrowUpRight, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  summary?: any;
}

export default function StatsCards({ summary }: StatsCardsProps) {
  const formatCurrency = (val: any) => {
    if (val === null || val === undefined) return "₦0";
    const num = Number(val);
    if (isNaN(num)) return "₦0";
    return `₦${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const cards = [
    {
      title: "Total Platform Revenue",
      value: formatCurrency(summary?.totalRevenue),
      subtitle: "Gross customer payments",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Customer Payments",
      value: formatCurrency(summary?.customerPayments ?? summary?.totalRevenue),
      subtitle: "Total orders processed",
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Agent Payouts",
      value: formatCurrency(summary?.agentPayouts),
      subtitle: "Earnings transferred",
      icon: ArrowUpRight,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Platform Commission",
      value: formatCurrency(summary?.platformCommission),
      subtitle: "Net platform share",
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-xl ${card.bg} ${card.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1a1a2e] m-0 truncate">
                  {card.value}
                </h2>
                <p className="text-[11px] text-gray-500 m-0 mt-1">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}