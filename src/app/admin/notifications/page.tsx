"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { communicationService } from "@/src/services/communicationService";
import { contactService } from "@/src/services/contactService";
import {
  Bell,
  MessageSquare,
  Mail,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "messages" | "contact">("all");
  const [conversations, setConversations] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const [convRes, contactRes] = await Promise.allSettled([
        communicationService.getConversations({ limit: 20 }),
        contactService.getInquiries(),
      ]);

      if (convRes.status === "fulfilled" && convRes.value?.data) {
        setConversations(convRes.value.data);
      }
      if (contactRes.status === "fulfilled") {
        const contactData = Array.isArray(contactRes.value)
          ? contactRes.value
          : contactRes.value?.data || [];
        setInquiries(contactData);
      }
    } catch (err) {
      console.error("Error fetching notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const formatTime = (dateString: string | Date | undefined) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";

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

  const getInitials = (name: string | null) => {
    if (!name || name === "Conversation") return "U";
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

  // Combine and sort notifications
  const allNotifications = [
    ...conversations.map((c) => ({
      id: c.id,
      title: c.name || "Customer Conversation",
      snippet: c.lastMessage || "Active conversation thread",
      date: c.lastMessageAt || c.updatedAt || c.createdAt,
      type: "message" as const,
      link: `/admin/messages/${c.id}`,
      unread: Boolean(c.unreadCount && c.unreadCount > 0),
    })),
    ...inquiries.map((i) => ({
      id: i.id,
      title: i.name ? `${i.name} (Contact Inquiry)` : "Contact Inquiry",
      snippet: i.subject ? `${i.subject}: ${i.message}` : i.message || "New inquiry received",
      date: i.createdAt,
      type: "contact" as const,
      link: "/admin/contact",
      unread: false,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedList = allNotifications.filter((item) => {
    if (activeTab === "messages" && item.type !== "message") return false;
    if (activeTab === "contact" && item.type !== "contact") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden space-y-6">
        {/* HEADER BAR */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] flex items-center justify-center text-[#FFC700]">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a1a2e] m-0">Notifications Center</h2>
              <p className="text-xs text-gray-500 m-0 mt-0.5">
                Real-time alerts, direct messages, and contact inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl transition-all border border-gray-200 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin text-[#FFC700]" : ""} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <Link
              href="/admin/messages"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white text-xs font-semibold rounded-xl transition-all no-underline shadow-sm"
            >
              Open Inbox &rarr;
            </Link>
          </div>
        </div>

        {/* TABS & SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200/80 shadow-sm w-fit">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border-0 cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#1a1a2e] text-white shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              All Notifications ({allNotifications.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border-0 cursor-pointer ${
                activeTab === "messages"
                  ? "bg-[#1a1a2e] text-white shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Messages ({conversations.length})
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border-0 cursor-pointer ${
                activeTab === "contact"
                  ? "bg-[#1a1a2e] text-white shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC700]"></div>
            </div>
          ) : displayedList.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center p-4">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3">
                <Bell size={24} />
              </div>
              <h3 className="text-base font-bold text-gray-800 m-0">No notifications found</h3>
              <p className="text-xs text-gray-500 m-0 mt-1 max-w-sm">
                When new conversations, customer orders, or inquiries arrive, they will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {displayedList.map((item, idx) => (
                <Link
                  key={item.id || idx}
                  href={item.link}
                  className="flex items-start gap-4 p-4 hover:bg-yellow-50/30 transition-colors no-underline group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm"
                    style={{ background: getColor(idx) }}
                  >
                    {item.type === "contact" ? <Mail size={16} /> : getInitials(item.title)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1a1a2e] m-0 truncate group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.type === "contact"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {item.type === "contact" ? "Inquiry" : "Message"}
                      </span>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#FFC700] animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 m-0 mt-1 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">
                      {formatTime(item.date)}
                    </span>
                    <span className="text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold">
                      View <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
