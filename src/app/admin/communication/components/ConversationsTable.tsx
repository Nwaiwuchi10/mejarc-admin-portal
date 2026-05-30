"use client";

import { MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";

type Status = "Active" | "Pending";

type Conversation = {
  id: string;
  name: string;
  type: string;
  team: string;
  message: string;
  status: Status;
  activity: string;
};

const data: Conversation[] = [
  {
    id: "CNV-2101",
    name: "John Doe",
    type: "Customer",
    team: "Support Team",
    message: "I need help with my project update.",
    status: "Active",
    activity: "10 mins ago",
  },
  {
    id: "CNV-2102",
    name: "Mark James",
    type: "Agent",
    team: "Operations Team",
    message: "The client requested another revision.",
    status: "Active",
    activity: "35 mins ago",
  },
  {
    id: "CNV-2103",
    name: "Emily White",
    type: "Customer",
    team: "Support Team",
    message: "My payment is still pending.",
    status: "Pending",
    activity: "2 hours ago",
  },
];

export default function ConversationsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] lg:min-w-full text-sm">
          
          {/* Header */}
          <thead className="bg-[#1a1a2e] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-medium">
                Conversation ID
              </th>

              <th className="px-6 py-4 text-left font-medium">
                User Name
              </th>

              <th className="px-6 py-4 text-left font-medium">
                User Type
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Assigned Team
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Last Message
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Status
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Last Activity
              </th>

              <th className="px-6 py-4 text-center font-medium">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-100 transition hover:bg-gray-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                <td className="px-6 py-5 font-semibold text-[#1a1a2e]">
                  {c.id}
                </td>

                <td className="px-6 py-5 font-medium text-[#1a1a2e]">
                  {c.name}
                </td>

                <td className="px-6 py-5 text-gray-700">
                  {c.type}
                </td>

                <td className="px-6 py-5 text-gray-700">
                  {c.team}
                </td>

                <td className="px-6 py-5 text-gray-600 italic max-w-[260px] truncate">
                  {c.message}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={c.status} />
                </td>

                <td className="px-6 py-5 text-gray-600">
                  {c.activity}
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <MoreMenu id={c.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

function MoreMenu({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-black"
      >
        <MoreHorizontal size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          
          <button
            onClick={() => {
              router.push(`/admin/messages/${id}`);
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            View Conversation
          </button>

          <button
            onClick={() => {
              console.log("Escalate to support");
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
          >
            Escalate to Support
          </button>

        </div>
      )}
    </div>
  );
}