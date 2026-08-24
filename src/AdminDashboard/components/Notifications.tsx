"use client";

import React from "react";
import Link from "next/link";
import { Eye, MessageSquare, ArrowRight } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface NotifRowProps {
    id: string;
    name: string;
    message: string;
    time: string;
    initials: string;
    avatarColor: string;
    type?: string;
    unreadCount?: number;
}

/* ── Single Row ────────────────────────────────────────────────────────── */
function NotifRow({ id, name, message, time, initials, avatarColor, type, unreadCount }: NotifRowProps) {
    return (
        <Link
            href={`/admin/messages/${id}`}
            className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 hover:bg-yellow-50/40 transition-colors duration-150 px-2.5 -mx-2.5 rounded-xl cursor-pointer no-underline group"
        >
            {/* Avatar */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 mt-0.5 shadow-sm ring-2 ring-white"
                style={{ background: avatarColor || "#FFC700" }}
            >
                {initials || name?.charAt(0) || "U"}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-[#1a1a2e] m-0 truncate group-hover:text-amber-700 transition-colors">
                        {name}
                    </p>
                    {type && type !== 'dm' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium capitalize">
                            {type}
                        </span>
                    )}
                    {unreadCount && unreadCount > 0 ? (
                        <span className="w-2 h-2 rounded-full bg-[#FFC700] animate-pulse" />
                    ) : null}
                </div>
                <p className="text-[12px] text-gray-600 m-0 mt-0.5 line-clamp-1 leading-relaxed">
                    {message || "No messages yet"}
                </p>
            </div>

            {/* Timestamp & Action */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0 mt-0.5">
                <span className="text-[11px] text-gray-500 whitespace-nowrap">{time}</span>
                <span className="text-[11px] text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-medium">
                    Reply <ArrowRight size={11} />
                </span>
            </div>
        </Link>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Notifications({ data }: { data?: any }) {
    const rawConversations = data?.data || (Array.isArray(data) ? data : []);
    const conversations = Array.isArray(rawConversations) ? rawConversations : [];

    const getInitials = (name: string | null) => {
        if (!name || name === "Conversation") return "??";
        return name
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    const getColor = (index: number) => {
        const colors = ["#e07b39", "#5b8dee", "#9c6bd6", "#22c55e", "#f59e0b", "#06b6d4"];
        return colors[index % colors.length];
    };

    const formatTime = (dateString: string | Date | undefined) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return "Just now";
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#FFF8E7] flex items-center justify-center text-[#FFC700]">
                            <MessageSquare size={16} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-[#1a1a2e] m-0">Recent Conversations</h2>
                            <p className="text-[11px] text-gray-500 m-0">Direct customer & agent messages</p>
                        </div>
                    </div>
                    <Link href="/admin/messages" className="no-underline">
                        <span className="flex items-center gap-1 text-[12px] text-gray-700 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer select-none">
                            View All <Eye size={12} className="text-[#FFC700]" />
                        </span>
                    </Link>
                </div>

                {/* List */}
                <div className="flex flex-col">
                    {conversations.length > 0 ? (
                        conversations.slice(0, 5).map((c: any, index: number) => (
                            <NotifRow
                                key={c.id || index}
                                id={c.id}
                                name={c.name || "Customer Conversation"}
                                message={c.lastMessage || (c.lastMessageAt ? "Active conversation" : "No messages yet")}
                                time={formatTime(c.lastMessageAt || c.updatedAt || c.createdAt)}
                                initials={getInitials(c.name)}
                                avatarColor={getColor(index)}
                                type={c.type}
                                unreadCount={c.unreadCount}
                            />
                        ))
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-2">
                                <MessageSquare size={20} />
                            </div>
                            <p className="text-sm font-semibold text-gray-700 m-0">No active conversations</p>
                            <p className="text-xs text-gray-500 m-0 mt-1 max-w-[240px]">
                                New conversations from customers and agents will appear here in real time.
                            </p>
                            <Link
                                href="/admin/messages"
                                className="mt-3 text-xs font-semibold text-[#1a1a2e] hover:underline"
                            >
                                Open Messages Inbox &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer info when conversations exist */}
            {conversations.length > 0 && (
                <div className="pt-3 mt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Showing latest {Math.min(conversations.length, 5)} conversations</span>
                    <Link href="/admin/messages" className="font-semibold text-amber-600 hover:text-amber-700 no-underline">
                        Open Inbox &rarr;
                    </Link>
                </div>
            )}
        </div>
    );
}
