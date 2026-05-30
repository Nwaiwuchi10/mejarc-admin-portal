"use client";

import React from "react";
import { Eye } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface PaymentRowProps {
    name: string;
    project: string;
    amount: string;
    initials: string;
    avatarColor: string;
}

/* ── Single Row ────────────────────────────────────────────────────────── */
function PaymentRow({ name, project, amount, initials, avatarColor }: PaymentRowProps) {
    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            {/* Avatar */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                style={{ background: avatarColor }}
            >
                {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1a1a2e] m-0 truncate">{name}</p>
                <p className="text-[11px] text-gray-500 m-0 truncate">{project}</p>
            </div>

            {/* Amount */}
            <span className="text-sm font-bold text-red-500 flex-shrink-0">{amount}</span>
        </div>
    );
}

/* ── Data ──────────────────────────────────────────────────────────────── */
const payments: PaymentRowProps[] = [
    {
        name: "Olamide James",
        project: "3D Interior Visualization for Duplex",
        amount: "₦650,000",
        initials: "OJ",
        avatarColor: "#e07b39",
    },
    {
        name: "Mr Brow Raymond",
        project: "3D Interior Visualization for Duplex",
        amount: "₦310,000",
        initials: "BR",
        avatarColor: "#5b8dee",
    },
    {
        name: "Abigail Matthew",
        project: "3D Interior Visualization for Duplex",
        amount: "₦2,400,000",
        initials: "AM",
        avatarColor: "#9c6bd6",
    },
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function PaymentRequest() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Payment Request</h2>
                <button className="flex items-center gap-1 text-[12px] text-gray-500 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col">
                {payments.map((p) => (
                    <PaymentRow key={p.name} {...p} />
                ))}
            </div>
        </div>
    );
}
