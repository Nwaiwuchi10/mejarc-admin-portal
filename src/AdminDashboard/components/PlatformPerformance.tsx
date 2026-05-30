"use client";

import React from "react";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface BarProps {
    label: string;
    value: number;      // 0–100
    colorClass: string;
    status: string;
    statusClass: string;
}

interface PlatformPerformanceProps {
    data?: any;
}

/* ── Single bar ────────────────────────────────────────────────────────── */
function ProgressBar({ label, value, colorClass, status, statusClass }: BarProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[13px]">
                <span className="text-gray-600 font-medium">{label}</span>
                <span className={`font-semibold text-[12px] ${statusClass}`}>{status}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                    style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
                />
            </div>
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function PlatformPerformance({ data }: PlatformPerformanceProps) {
    // Mapping from GET /admin/reports/performance
    // { total, completed, inProgress, disputed, cancelled, completionRate }
    
    const completionRate = data?.completionRate || 0;
    const inProgressCount = data?.inProgress || 0;
    const total = data?.total || 1; // Avoid division by zero
    const inProgressRate = (inProgressCount / total) * 100;

    const metrics = [
        {
            label: "Project completion rate",
            value: completionRate,
            colorClass: completionRate > 70 ? "bg-green-500" : completionRate > 40 ? "bg-[#FFC700]" : "bg-red-500",
            status: `${completionRate}% ${completionRate > 70 ? "Good" : "Average"}`,
            statusClass: completionRate > 70 ? "text-green-600" : "text-yellow-600",
        },
        {
            label: "Projects In-Progress",
            value: inProgressRate,
            colorClass: "bg-blue-500",
            status: `${inProgressCount} active`,
            statusClass: "text-blue-600",
        },
        {
            label: "Response times",
            value: 92, // Mock for now until endpoint provides it
            colorClass: "bg-green-500",
            status: "Fast",
            statusClass: "text-green-600",
        },
        {
            label: "Customer satisfaction",
            value: 98, // Mock for now
            colorClass: "bg-green-500",
            status: "98% Excellent",
            statusClass: "text-green-600",
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Platform Performance</h2>
                <div className="flex items-center gap-1 text-[12px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-150 select-none">
                    Real-time <span className="text-gray-600 ml-0.5">▾</span>
                </div>
            </div>
            <p className="text-[11px] text-gray-600 m-0 mb-5">Snapshot of platform health</p>

            {/* Progress bars */}
            <div className="flex flex-col gap-5">
                {metrics.map((m) => (
                    <ProgressBar key={m.label} {...m} />
                ))}
            </div>
        </div>
    );
}
