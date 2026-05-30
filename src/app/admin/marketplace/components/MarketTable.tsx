"use client";

import { useState, useRef, useEffect } from "react";
import StatusBadge, { MarketStatus } from "./StatusBadge";
import { MoreHorizontal, User } from "lucide-react";

type Market = {
  id: string;
  title: string;
  agent: string;
  date: string;
  category: string;
  value: string;
  status: MarketStatus;
  type: "Building Plan" | "Product Design";
  avatar: string;
};

const actions = [
  "Approve",
  "Reject",
  "Request Change",
  "View Detail",
  "Notify Agent",
];

interface MarketTableProps {
  activeTab: string;
  status: string;
  listings?: any[];
}

export default function MarketTable({
  activeTab,
  status,
  listings: propListings
}: MarketTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayData = propListings && propListings.length > 0 ? propListings.map(l => ({
    id: l.id,
    title: l.title || l.name || "N/A",
    agent: l.agent?.firstName ? `${l.agent.firstName} ${l.agent.lastName}` : l.agentName || "N/A",
    date: l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "N/A",
    category: l.category?.name || l.category || "N/A",
    value: `₦${l.price?.toLocaleString() || "0"}`,
    status: (l.status || "Pending Approval") as MarketStatus,
    type: l.type || activeTab,
    avatar: l.agent?.profilePicture || "https://i.pravatar.cc/100"
  })) : [];

  const filtered = displayData
    .filter((s) => s.type === activeTab)
    .filter((s) => (status === "All" ? true : s.status === status));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isProductDesign = activeTab === "Product Design";

return (
  <div
  ref={wrapperRef}
  className="w-full max-w-full overflow-x-auto overflow-y-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm"
>
    <table className="w-full text-left text-sm xl:min-w-[1100px]">
      <thead className="bg-[#1a1a2e] text-white">
        <tr>
          <th className="px-4 py-4 whitespace-nowrap">
            <div className="flex justify-center">
              <User size={16} />
            </div>
          </th>

          {isProductDesign ? (
            <>
              <th className="px-4 py-4 whitespace-nowrap">No.</th>
              <th className="px-4 py-4 whitespace-nowrap">Product Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Category</th>
              <th className="px-4 py-4 whitespace-nowrap">Agent Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Submission Date</th>
              <th className="px-4 py-4 whitespace-nowrap">Value</th>
              <th className="px-4 py-4 whitespace-nowrap">Status</th>
              <th className="px-4 py-4 whitespace-nowrap text-right">Action</th>
            </>
          ) : (
            <>
              <th className="px-4 py-4 whitespace-nowrap">No.</th>
              <th className="px-4 py-4 whitespace-nowrap">Project Title</th>
              <th className="px-4 py-4 whitespace-nowrap">Agent Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Submission Date</th>
              <th className="px-4 py-4 whitespace-nowrap">Category</th>
              <th className="px-4 py-4 whitespace-nowrap">Value</th>
              <th className="px-4 py-4 whitespace-nowrap">Status</th>
              <th className="px-4 py-4 whitespace-nowrap text-right">Action</th>
            </>
          )}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100 italic">
        {filtered.length === 0 ? (
            <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-600 font-medium">No marketplace listings found.</td></tr>
        ) : (
          filtered.map((s, i) => (
            <tr
                key={s.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
            >
                <td className="px-4 py-4 whitespace-nowrap">
                <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                    <img
                    src={s.avatar}
                    alt={s.agent}
                    className="h-full w-full object-cover"
                    />
                </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                    {i + 1}
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e] font-semibold">
                {s.title}
                </td>

                {isProductDesign ? (
                <>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {s.category}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {s.agent}
                    </td>
                </>
                ) : (
                <>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {s.agent}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-gray-600 font-medium">
                    {s.date}
                    </td>
                </>
                )}

                {isProductDesign ? (
                <td className="px-4 py-4 whitespace-nowrap text-gray-600 font-medium">
                    {s.date}
                </td>
                ) : (
                <td className="px-4 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {s.category}
                </td>
                )}

                <td className="px-4 py-4 whitespace-nowrap text-blue-600 font-bold">
                    {s.value}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={s.status} />
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-right">
                <button
                    onClick={() =>
                    setOpenMenuId(openMenuId === s.id ? null : s.id)
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                >
                    <MoreHorizontal size={18} />
                </button>

                {openMenuId === s.id && (
                    <div className="absolute right-4 z-50 w-44 rounded-2xl border border-gray-200 bg-white py-2 shadow-2xl text-left">
                    {actions.map((action) => (
                        <button
                        key={action}
                        type="button"
                        onClick={() => setOpenMenuId(null)}
                        className="block w-full px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100 font-medium"
                        >
                        {action}
                        </button>
                    ))}
                    </div>
                )}
                </td>
            </tr>
            ))
        )}
      </tbody>
    </table>
  </div>
);
}