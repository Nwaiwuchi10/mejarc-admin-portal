"use client";

import React from "react";
import { Eye } from "lucide-react";

/* ── Mini tile ─────────────────────────────────────────────────────────── */
interface TileProps {
    label: string;
    value: string;
    valueClass: string;
}
function HealthTile({ label, value, valueClass }: TileProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-[11px] text-gray-500 m-0 leading-none mb-1">{label}</p>
            <p className={`text-lg font-bold m-0 leading-none ${valueClass}`}>{value}</p>
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function SystemHealth() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">System Health</h2>
                <button className="flex items-center gap-1 text-[12px] text-gray-500 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* Health Bar */}
            <div className="w-full h-10 rounded-xl overflow-hidden bg-gray-100 mb-4">
                <div className="h-full w-[78%] bg-gradient-to-r from-green-400 to-green-600 rounded-xl" />
            </div>

            {/* Stat Tiles Grid */}
            <div className="grid grid-cols-2 gap-3">
                <HealthTile label="Uptime" value="99.8%" valueClass="text-green-600" />
                <HealthTile label="API Status" value="Healthy" valueClass="text-green-600" />
                <HealthTile label="DB Load" value="42%" valueClass="text-yellow-500" />
                <HealthTile label="Errors" value="3" valueClass="text-red-500" />
            </div>
        </div>
    );
}
