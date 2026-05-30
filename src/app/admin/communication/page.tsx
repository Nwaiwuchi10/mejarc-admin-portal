"use client";

import Stats from "./components/Stats";
import ConversationsTable from "./components/ConversationsTable";
import RecentMessages from "./components/RecentMessages";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";

export default function Communication() {
  return (
    <AdminLayout>
        <div className="w-full max-w-full overflow-x-hidden p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      <Stats />
      <ConversationsTable />
      <RecentMessages />
    </div>
    </AdminLayout>
  );
}