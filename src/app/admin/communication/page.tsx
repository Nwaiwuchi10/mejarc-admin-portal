"use client";

import { useState, useEffect } from "react";
import Stats from "./components/Stats";
import ConversationsTable from "./components/ConversationsTable";
import RecentMessages from "./components/RecentMessages";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { communicationService } from "@/src/services/communicationService";

export default function Communication() {
  const [stats, setStats] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [statsRes, conversationsRes] = await Promise.all([
      communicationService.getStats(),
      communicationService.getConversations({ limit: 10 })
    ]);

    if (statsRes) setStats(statsRes);
    if (conversationsRes.data) setConversations(conversationsRes.data);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <Stats stats={stats} />
            <ConversationsTable conversations={conversations} />
            <RecentMessages />
          </>
        )}
      </div>
    </AdminLayout>
  );
}