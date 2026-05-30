"use client";

import { useParams } from "next/navigation";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { messageService } from "@/src/services/messageService";

export default function MessagePage() {
  const { id } = useParams() as { id: string };
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const [chatData, setChatData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
    if (id) {
      fetchChat();
    }
  }, [id]);

  const fetchConversations = async () => {
    const res = await messageService.getConversations();
    if (res.data) setConversations(res.data);
  };

  const fetchChat = async () => {
    setLoading(true);
    const res = await messageService.getMessagesByConversationId(id);
    if (res) setChatData(res);
    setLoading(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const res = await messageService.replyToConversation(id, messageText);
    if (res) {
      setMessageText("");
      fetchChat(); // Refresh chat
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">

        {/* ===== LEFT PANEL (Conversations List) ===== */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Messages</h2>
          </div>

          <div className="overflow-y-auto flex-1">
            {conversations.map((conv, i) => (
              <div
                key={i}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${id === conv.id ? 'bg-gray-100' : ''}`}
                onClick={() => window.location.href = `/admin/messages/${conv.id}`}
              >
                <p className="font-medium text-gray-900">{conv.name || `Conversation ${conv.id.substring(0, 8)}`}</p>
                <p className="text-sm text-gray-600 truncate">
                  {conv.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT PANEL (CHAT AREA) ===== */}
        <div className="col-span-12 md:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">
                {chatData?.conversation?.name || `Conversation: ${id}`}
              </p>
              <p className="text-sm text-gray-600">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              </div>
            ) : (
              chatData?.messages?.map((msg: any, i: number) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.author?.id === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-sm
                      ${
                        msg.author?.id === "admin"
                          ? "bg-yellow-400 text-black rounded-br-none"
                          : "bg-white text-gray-800 border rounded-bl-none"
                      }
                    `}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[10px] text-gray-600 mt-1 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t flex items-center gap-3">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition">
              <Send size={18} className="text-black" />
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}