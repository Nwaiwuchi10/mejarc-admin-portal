"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { messageService } from "@/src/services/messageService";
import { useRouter } from "next/navigation";

export default function MessagesMainPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const res = await messageService.getConversations();
    if (res.data && res.data.length > 0) {
      router.push(`/admin/messages/${res.data[0].id}`);
    } else {
      setConversations(res.data || []);
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-gray-50 rounded-xl border border-gray-100">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-600">When you receive messages, they will appear here.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
