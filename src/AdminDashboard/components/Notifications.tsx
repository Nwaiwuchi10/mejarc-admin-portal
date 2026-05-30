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

interface NotificationsProps {
    data?: any;
}

/* ── Single Row ────────────────────────────────────────────────────────── */
function NotifRow({ name, message, time, initials, avatarColor }: NotifRowProps) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors duration-150 px-2 -mx-2 rounded-lg">
            {/* Avatar */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 mt-0.5"
                style={{ background: avatarColor || "#FFC700" }}
            >
                {initials || name?.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1a1a2e] m-0">{name}</p>
                <p className="text-[12px] text-gray-600 m-0 mt-0.5 line-clamp-2 leading-relaxed">{message}</p>
            </div>

            {/* Timestamp */}
            <span className="text-[11px] text-gray-600 flex-shrink-0 mt-0.5 whitespace-nowrap">{time}</span>
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Notifications({ data }: NotificationsProps) {
    const conversations = data?.data || [];

    const getInitials = (name: string | null) => {
        if (!name) return "??";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getColor = (index: number) => {
        const colors = ["#e07b39", "#5b8dee", "#9c6bd6", "#22c55e", "#f59e0b"];
        return colors[index % colors.length];
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1a1a2e] m-0">Recent Conversations</h2>
                <button className="flex items-center gap-1 text-[12px] text-gray-600 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer">
                    View <Eye size={12} className="text-[#FFC700]" />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col">
                {conversations.length > 0 ? (
                    conversations.slice(0, 5).map((c: any, index: number) => (
                        <NotifRow
                            key={c.id}
                            name={c.name || "Customer Group"}
                            message={c.lastMessage || "No messages yet"}
                            time={c.lastMessageAt ? formatTime(c.lastMessageAt) : ""}
                            initials={getInitials(c.name)}
                            avatarColor={getColor(index)}
                        />
                    ))
                ) : (
                    <div className="py-12 text-center text-gray-600 text-sm">
                        No active conversations
                    </div>
                )}
            </div>
        </div>
    );
}
