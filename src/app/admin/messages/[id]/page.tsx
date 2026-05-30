"use client";

import { useParams } from "next/navigation";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { Send } from "lucide-react";
import { useState } from "react";

export default function MessagePage() {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const messages = [
    {
      sender: "agent",
      text: "Hello John, your project has been updated.",
      time: "10:12 AM",
    },
    {
      sender: "user",
      text: "Thank you! Can I request one more revision?",
      time: "10:14 AM",
    },
    {
      sender: "agent",
      text: "Yes, sure. Please provide details.",
      time: "10:15 AM",
    },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">

        {/* ===== LEFT PANEL (Conversations List) ===== */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">

          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Messages</h2>
          </div>

          <div className="overflow-y-auto flex-1">
            {["John Doe", "Mark James", "Emily White"].map((name, i) => (
              <div
                key={i}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <p className="font-medium text-gray-900">{name}</p>
                <p className="text-sm text-gray-500 truncate">
                  Last message preview...
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
                Conversation: {id}
              </p>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-sm
                    ${
                      msg.sender === "user"
                        ? "bg-yellow-400 text-black rounded-br-none"
                        : "bg-white text-gray-800 border rounded-bl-none"
                    }
                  `}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-gray-500 mt-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex items-center gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition">
              <Send size={18} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}