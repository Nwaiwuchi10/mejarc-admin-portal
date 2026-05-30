"use client";

import React from "react";
import { Eye } from "lucide-react";

interface UsersManagementProps {
    data?: any;
}

/* ── SVG Donut Chart ───────────────────────────────────────────────────── */
function DonutChart({ total, active }: { total: number, active: number }) {
    const radius = 54;
    const circ = 2 * Math.PI * radius; // ≈ 339.3
    const activePct = total > 0 ? active / total : 0;
    const suspendedPct = total > 0 ? (total - active) / total : 0;
    const activeDash = activePct * circ;
    const suspendedDash = suspendedPct * circ;

    return (
        <div className="relative flex items-center justify-center w-[160px] h-[160px] flex-shrink-0">
            <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                {/* Track */}
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#f0f0f0" strokeWidth="18" />
                {/* Green segment — Active Users */}
                <circle
                    cx="70" cy="70" r={radius} fill="none"
                    stroke="#22c55e" strokeWidth="18"
                    strokeDasharray={`${activeDash} ${circ - activeDash}`}
                    strokeDashoffset="0"
                    strokeLinecap="butt"
                />
                {/* Yellow segment — Suspended Users */}
                <circle
                    cx="70" cy="70" r={radius} fill="none"
                    stroke="#FFC700" strokeWidth="18"
                    strokeDasharray={`${suspendedDash} ${circ - suspendedDash}`}
                    strokeDashoffset={`-${activeDash}`}
                    strokeLinecap="butt"
                />
            </svg>
            {/* Centre label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[11px] text-gray-600 leading-none">Total Users</span>
                <span className="text-[22px] font-bold text-[#1a1a2e] leading-tight">{total.toLocaleString()}</span>
            </div>
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function UsersManagement({ data }: UsersManagementProps) {
    const total = data?.meta?.total || 0;
    const active = data?.data?.filter((u: any) => u.status === 'Active').length || 0;
    const suspended = data?.data?.filter((u: any) => u.status === 'Suspended').length || 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Users Management</h2>
                <button className="flex items-center gap-1 text-[12px] text-gray-600 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* Chart + Legend */}
            <div className="flex items-center gap-6 flex-wrap">
                <DonutChart total={total} active={active} />

                <div className="flex flex-col gap-5">
                    {/* Active */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                        <div>
                            <p className="text-[11px] text-gray-600 m-0 leading-none mb-0.5">Active Users</p>
                            <p className="text-xl font-bold text-[#1a1a2e] m-0 leading-none">{active}</p>
                        </div>
                    </div>
                    {/* Suspended */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-[#FFC700] flex-shrink-0" />
                        <div>
                            <p className="text-[11px] text-gray-600 m-0 leading-none mb-0.5">Suspended Users</p>
                            <p className="text-xl font-bold text-[#1a1a2e] m-0 leading-none">{suspended}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
