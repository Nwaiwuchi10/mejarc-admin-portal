"use client";

import React from "react";
import { TrendingUp, Eye } from "lucide-react";

function Sparkline() {
    return (
        <svg viewBox="0 0 80 32" fill="none" className="w-20 h-8 flex-shrink-0">
            <polyline
                points="0,28 14,18 28,22 42,10 56,16 70,8 80,12"
                stroke="#FFC700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

interface StatCardProps {
    title: string;
    value: string;
    change: string;
}

export default function StatCard({ title, value, change }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-500 font-medium leading-tight">{title}</span>
                <button className="flex items-center gap-1 text-[12px] text-gray-500 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* Value */}
            <div className="text-2xl font-bold text-[#1a1a2e] tracking-tight">{value}</div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-[12px] text-green-500 font-medium">
                    <TrendingUp size={13} />
                    {change}
                </span>
                <Sparkline />
            </div>
        </div>
    );
}
