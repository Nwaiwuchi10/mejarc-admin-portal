"use client";

import React from "react";
import { Eye } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface PaymentRowProps {
    name: string;
    project: string;
    amount: string | number;
    initials: string;
    avatarColor: string;
}

interface PaymentRequestProps {
    data?: any;
}

/* ── Single Row ────────────────────────────────────────────────────────── */
function PaymentRow({ name, project, amount, initials, avatarColor }: PaymentRowProps) {
    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            {/* Avatar */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                style={{ background: avatarColor || "#FFC700" }}
            >
                {initials || name?.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1a1a2e] m-0 truncate">{name}</p>
                <p className="text-[11px] text-gray-600 m-0 truncate">{project}</p>
            </div>

            {/* Amount */}
            <span className="text-sm font-bold text-red-500 flex-shrink-0">
                ₦{typeof amount === 'number' ? amount.toLocaleString() : amount}
            </span>
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function PaymentRequest({ data }: PaymentRequestProps) {
    const transactions = data?.data || [];

    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : "??";
    };

    const getColor = (index: number) => {
        const colors = ["#e07b39", "#5b8dee", "#9c6bd6", "#22c55e", "#f59e0b"];
        return colors[index % colors.length];
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Recent Transactions</h2>
                <button className="flex items-center gap-1 text-[12px] text-gray-600 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col">
                {transactions.length > 0 ? (
                    transactions.slice(0, 4).map((p: any, index: number) => (
                        <PaymentRow
                            key={p.id}
                            name={p.customer || "Unknown"}
                            project={p.project || "N/A"}
                            amount={p.amount}
                            initials={getInitials(p.customer)}
                            avatarColor={getColor(index)}
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-gray-600 text-sm">
                        No recent transactions found
                    </div>
                )}
            </div>
        </div>
    );
}
