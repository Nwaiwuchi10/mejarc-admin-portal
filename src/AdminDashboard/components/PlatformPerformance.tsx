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
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

/* ── Data ──────────────────────────────────────────────────────────────── */
const metrics: BarProps[] = [
    {
        label: "Response times",
        value: 15,
        colorClass: "bg-red-500",
        status: "15% Low",
        statusClass: "text-red-500",
    },
    {
        label: "Project completion rate",
        value: 75,
        colorClass: "bg-green-500",
        status: "75% Good",
        statusClass: "text-green-600",
    },
    {
        label: "Customer satisfaction",
        value: 95,
        colorClass: "bg-green-500",
        status: "95% Excellent",
        statusClass: "text-green-600",
    },
    {
        label: "Agent activity",
        value: 50,
        colorClass: "bg-gray-400",
        status: "50% Average",
        statusClass: "text-gray-500",
    },
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function PlatformPerformance() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Platform Performance</h2>
                <div className="flex items-center gap-1 text-[12px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-150 select-none">
                    This Month <span className="text-gray-400 ml-0.5">▾</span>
                </div>
            </div>
            <p className="text-[11px] text-gray-400 m-0 mb-5">Snapshot of platform health</p>

            {/* Progress bars */}
            <div className="flex flex-col gap-5">
                {metrics.map((m) => (
                    <ProgressBar key={m.label} {...m} />
                ))}
            </div>
        </div>
    );
}
