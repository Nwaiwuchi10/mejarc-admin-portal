"use client";

import React, { useState } from "react";
import { BarChart3 } from "lucide-react";

interface RevenueChartProps {
  data?: any[];
}

export default function RevenueChart({ data: propData }: RevenueChartProps) {
  const chartData = Array.isArray(propData) && propData.length > 0 ? propData : [];
  
  const currentMonthLabel = new Date().toLocaleString("default", { month: "short" }).toUpperCase();
  const values = chartData.map((item) => Number(item.revenue || item.value || 0));
  const rawMax = Math.max(...values, 0);
  const maxValue = rawMax > 0 ? rawMax * 1.15 : 100000; // 15% headroom

  const intervals = [
    maxValue,
    maxValue * 0.75,
    maxValue * 0.5,
    maxValue * 0.25,
    0,
  ];

  const formatShort = (val: number) => {
    if (val >= 1_000_000) return `₦${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `₦${(val / 1_000).toFixed(0)}K`;
    return `₦${Math.round(val)}`;
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden h-full flex flex-col justify-between">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFF8E7] flex items-center justify-center text-[#FFC700]">
            <BarChart3 size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1a1a2e] m-0">
              Revenue Analytics
            </h3>
            <p className="mt-0.5 text-xs text-gray-500 m-0">
              Monthly revenue distribution from real orders
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
          Past 6 Months
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="py-20 flex flex-col justify-center items-center text-center">
          <p className="text-gray-400 font-medium text-sm m-0">No order revenue data recorded</p>
          <p className="text-gray-400 text-xs mt-1">Paid customer transactions will appear here</p>
        </div>
      ) : (
        /* CHART CONTAINER */
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-[340px] gap-3">
            {/* Y AXIS LABELS */}
            <div className="flex h-56 flex-col justify-between pb-6 text-[11px] font-medium text-gray-400 w-14 text-right pr-2">
              {intervals.map((val, idx) => (
                <span key={idx}>{formatShort(val)}</span>
              ))}
            </div>

            {/* BARS AREA */}
            <div className="flex h-56 flex-1 items-end justify-between gap-2 sm:gap-4 border-b border-l border-gray-100 px-3 pb-6">
              {chartData.map((item: any, idx: number) => {
                const chartHeight = 170;
                const val = Number(item.revenue || item.value || 0);
                const heightPx = maxValue > 0 ? (val / maxValue) * chartHeight : 4;
                const finalHeight = Math.max(heightPx, 6);
                const isCurrentMonth = item.month?.toUpperCase() === currentMonthLabel;

                return (
                  <div
                    key={item.month || idx}
                    className="flex flex-1 flex-col items-center justify-end gap-2 group relative"
                  >
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#1a1a2e] text-white text-[10px] py-1 px-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-20">
                      ₦{val.toLocaleString()} {item.orderCount ? `(${item.orderCount} orders)` : ""}
                    </div>

                    <div
                      className={`w-full max-w-[36px] rounded-t-lg transition-all duration-500 ${
                        isCurrentMonth
                          ? "bg-gradient-to-t from-[#FFC700] to-yellow-400 shadow-sm"
                          : val > 0
                          ? "bg-gradient-to-t from-gray-300 to-gray-400"
                          : "bg-gray-100"
                      }`}
                      style={{ height: `${finalHeight}px` }}
                    />

                    <span className={`text-[11px] font-semibold ${isCurrentMonth ? "text-[#1a1a2e]" : "text-gray-500"}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}