"use client";

import { useState } from "react";

interface PerformanceProps {
  data?: any;
}

export default function Performance({ data }: PerformanceProps) {
  const [showFilter, setShowFilter] = useState(false);

  // { total, completed, inProgress, disputed, cancelled, completionRate }
  const total = data?.total || 1;
  const completedPct = Math.round(((data?.completed || 0) / total) * 100);
  const inProgressPct = Math.round(((data?.inProgress || 0) / total) * 100);
  const disputedPct = Math.round(((data?.disputed || 0) / total) * 100);
  const cancelledPct = Math.round(((data?.cancelled || 0) / total) * 100);

  const stats = [
    {
      label: "Completed",
      value: data?.completed || 0,
      color: "text-purple-600",
      bg: "bg-purple-100",
      pct: completedPct
    },
    {
      label: "In Progress",
      value: data?.inProgress || 0,
      color: "text-green-600",
      bg: "bg-green-100",
      pct: inProgressPct
    },
    {
      label: "Disputed",
      value: data?.disputed || 0,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      pct: disputedPct
    },
    {
      label: "Cancelled",
      value: data?.cancelled || 0,
      color: "text-red-500",
      bg: "bg-red-100",
      pct: cancelledPct
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm space-y-4 relative overflow-hidden h-full">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[#1a1a2e]">
            Project Performance
          </h3>
          <p className="mt-1 text-xs text-gray-600">
            Overview of delivery metrics
          </p>
        </div>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-[#1a1a2e] transition hover:bg-gray-200"
        >
          Dynamic Analysis
        </button>
      </div>

      {/* CIRCLES */}
      <div className="flex flex-wrap items-end justify-center gap-5 py-4">
        {stats.map((s, i) => (
            <div key={i} 
                className={`flex items-center justify-center rounded-full font-bold shadow-sm transition-all duration-1000 ${s.bg} ${s.color} ${
                    i === 0 ? "h-32 w-32 text-3xl" : 
                    i === 1 ? "h-24 w-24 text-xl" : 
                    i === 2 ? "h-20 w-20 text-lg" : "h-16 w-16 text-sm"
                }`}
            >
                {s.pct}%
            </div>
        ))}
      </div>

      {/* STATS */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
        {stats.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`text-sm ${item.color}`}>●</span>
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="ml-auto text-sm font-semibold text-[#1a1a2e]">
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}