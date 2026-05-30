"use client";

import React from "react";
import { Eye } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface NotifRowProps {
    name: string;
    message: string;
    time: string;
    initials: string;
    avatarColor: string;
}

/* ── Single Row ────────────────────────────────────────────────────────── */
function NotifRow({ name, message, time, initials, avatarColor }: NotifRowProps) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
            {/* Avatar */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 mt-0.5"
                style={{ background: avatarColor }}
            >
                {initials}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1a1a2e] m-0">{name}</p>
                <p className="text-[12px] text-gray-500 m-0 mt-0.5 line-clamp-2 leading-relaxed">{message}</p>
            </div>

            {/* Timestamp */}
            <span className="text-[11px] text-gray-400 flex-shrink-0 mt-0.5 whitespace-nowrap">{time}</span>
        </div>
    );
}

/* ── Data ──────────────────────────────────────────────────────────────── */
const notifications: NotifRowProps[] = [
    {
        name: "Olamide James",
        message:
            "Hello Admin, my project has been stuck in In-Progress' for over a week with no updates from the assigned agent.",
        time: "2 hours ago",
        initials: "OJ",
        avatarColor: "#e07b39",
    },
    {
        name: "Precious Samuel",
        message:
            "I just wanted to share how impressed I am with the agent assigned to my project",
        time: "2 hours ago",
        initials: "PS",
        avatarColor: "#9c6bd6",
    },
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Notifications() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Notifications</h2>
                <button className="flex items-center gap-1 text-[12px] text-gray-500 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col">
                {notifications.map((n) => (
                    <NotifRow key={n.name} {...n} />
                ))}
            </div>
        </div>
    );
}
