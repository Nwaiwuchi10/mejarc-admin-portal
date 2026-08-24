"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

interface PerformanceProps {
  data?: any;
}

export default function Performance({ data }: PerformanceProps) {
  const total = Number(data?.total || data?.totalOrders || 0);
  const completed = Number(data?.completed || data?.completedOrders || 0);
  const inProgress = Number(data?.inProgress || data?.inProgressOrders || 0);
  const disputed = Number(data?.disputed || 0);
  const cancelled = Number(data?.cancelled || 0);

  const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const disputedPct = total > 0 ? Math.round((disputed / total) * 100) : 0;
  const cancelledPct = total > 0 ? Math.round((cancelled / total) * 100) : 0;

  const stats = [
    {
      label: "Completed",
      value: completed,
      pct: completedPct,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      ring: "ring-purple-400",
      icon: CheckCircle2,
    },
    {
      label: "In Progress",
      value: inProgress,
      pct: inProgressPct,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      ring: "ring-emerald-400",
      icon: Clock,
    },
    {
      label: "Disputed",
      value: disputed,
      pct: disputedPct,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      ring: "ring-amber-400",
      icon: AlertCircle,
    },
    {
      label: "Cancelled",
      value: cancelled,
      pct: cancelledPct,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      ring: "ring-red-400",
      icon: XCircle,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 relative overflow-hidden h-full flex flex-col justify-between">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#1a1a2e] m-0">
            Project & Order Performance
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 m-0">
            Overview of live delivery and fulfillment metrics
          </p>
        </div>

        <div className="flex items-center gap-1 text-[12px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-medium select-none">
          Live Real-time <span className="w-2 h-2 rounded-full bg-green-500 ml-1 inline-block animate-pulse" />
        </div>
      </div>

      {/* CIRCLES VISUALIZATION */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`flex items-center justify-center rounded-full font-extrabold shadow-sm transition-all duration-700 border-2 ${s.border} ${s.bg} ${s.color} ${
                i === 0
                  ? "h-28 w-28 text-2xl"
                  : i === 1
                  ? "h-24 w-24 text-xl"
                  : i === 2
                  ? "h-20 w-20 text-base"
                  : "h-16 w-16 text-sm"
              }`}
            >
              {s.pct}%
            </div>
            <span className="text-xs font-semibold text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>

      {/* DETAILED STATS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-100 pt-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50/70">
              <Icon size={16} className={item.color} />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-gray-500 m-0 leading-none truncate">{item.label}</p>
                <p className="text-sm font-bold text-[#1a1a2e] m-0 mt-0.5">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}