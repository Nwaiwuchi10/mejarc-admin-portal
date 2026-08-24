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
                    className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
                    style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
                />
            </div>
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function PlatformPerformance({ data }: PlatformPerformanceProps) {
    // 100% Real metrics mapped from GET /admin/reports/performance
    const totalOrders = data?.totalOrders ?? data?.total ?? 0;
    const completedOrders = data?.completedOrders ?? data?.completed ?? 0;
    const inProgressOrders = data?.inProgressOrders ?? data?.inProgress ?? 0;
    const completionRate = data?.completionRate ?? (totalOrders > 0 ? +((completedOrders / totalOrders) * 100).toFixed(1) : 0);
    const inProgressRate = totalOrders > 0 ? +((inProgressOrders / totalOrders) * 100).toFixed(1) : 0;

    const totalAgents = data?.totalAgents ?? 0;
    const approvedAgents = data?.approvedAgents ?? 0;
    const agentApprovalRate = data?.agentApprovalRate ?? (totalAgents > 0 ? +((approvedAgents / totalAgents) * 100).toFixed(1) : 0);

    const totalProducts = data?.totalProducts ?? 0;
    const approvedProducts = data?.approvedProducts ?? 0;
    const productApprovalRate = data?.productApprovalRate ?? (totalProducts > 0 ? +((approvedProducts / totalProducts) * 100).toFixed(1) : 0);

    const metrics: BarProps[] = [
        {
            label: "Order Completion Rate",
            value: Number(completionRate),
            colorClass: completionRate >= 70 ? "bg-green-500" : completionRate >= 40 ? "bg-[#FFC700]" : "bg-red-500",
            status: totalOrders > 0 ? `${completionRate}% (${completedOrders}/${totalOrders})` : "0% (0 total)",
            statusClass: completionRate >= 70 ? "text-green-600" : "text-yellow-600",
        },
        {
            label: "Orders In-Progress",
            value: Number(inProgressRate),
            colorClass: "bg-blue-500",
            status: `${inProgressOrders} active (${inProgressRate}%)`,
            statusClass: "text-blue-600",
        },
        {
            label: "Agent KYC & Verification",
            value: Number(agentApprovalRate),
            colorClass: agentApprovalRate >= 70 ? "bg-emerald-500" : "bg-[#FFC700]",
            status: totalAgents > 0 ? `${agentApprovalRate}% (${approvedAgents}/${totalAgents})` : "0% (0 agents)",
            statusClass: agentApprovalRate >= 70 ? "text-emerald-600" : "text-yellow-600",
        },
        {
            label: "Product Listings Approved",
            value: Number(productApprovalRate),
            colorClass: productApprovalRate >= 70 ? "bg-indigo-500" : "bg-orange-500",
            status: totalProducts > 0 ? `${productApprovalRate}% (${approvedProducts}/${totalProducts})` : "0% (0 listings)",
            statusClass: productApprovalRate >= 70 ? "text-indigo-600" : "text-orange-600",
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Platform Performance</h2>
                <div className="flex items-center gap-1 text-[12px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-medium select-none">
                    Live Data <span className="w-2 h-2 rounded-full bg-green-500 ml-1 inline-block animate-pulse" />
                </div>
            </div>
            <p className="text-[11px] text-gray-600 m-0 mb-5">Live platform performance from database</p>

            {/* Progress bars */}
            <div className="flex flex-col gap-5">
                {metrics.map((m) => (
                    <ProgressBar key={m.label} {...m} />
                ))}
            </div>
        </div>
    );
}
