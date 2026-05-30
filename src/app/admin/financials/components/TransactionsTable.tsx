"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import StatusBadge from "./StatusBadge";

type Transaction = {
  id: string;
  customer: string;
  project: string;
  category: string;
  amount: string;
  method: string;
  date: string;
  status: string;
};

type Payout = {
  id: string;
  agent: string;
  avatar: string;
  project: string;
  amount: string;
  status: string;
  date: string;
};

type Dispute = {
  id: string;
  customer: string;
  agent: string;
  project: string;
  amount: string;
  date: string;
  status: string;
  notes: string;
};

type Refund = {
  id: string;
  customer: string;
  project: string;
  amount: string;
  status: string;
  date: string;
  reason: string;
};

const customerTransactions: Transaction[] = [
  {
    id: "TXN-001",
    customer: "John Smith",
    project: "Eco Home Design",
    category: "Marketplace",
    amount: "₦1,200,000",
    method: "Credit Card",
    date: "Mar 1, 2026",
    status: "Completed",
  },
  {
    id: "TXN-002",
    customer: "Aisha Bello",
    project: "Luxury Villa",
    category: "Custom Project",
    amount: "₦400,000",
    method: "Credit Card",
    date: "Mar 3, 2026",
    status: "Completed",
  },
  {
    id: "TXN-003",
    customer: "Ahmed Musa",
    project: "Office Desk",
    category: "Product Design",
    amount: "₦600,000",
    method: "Credit Card",
    date: "Mar 5, 2026",
    status: "Pending",
  },
];

const agentPayouts: Payout[] = [
  {
    id: "TXN-001",
    agent: "John Smith",
    avatar: "/avatars/avatar-1.jpg",
    project: "Eco Home Design",
    amount: "₦600,000",
    status: "Pending Release",
    date: "Mar 1, 2026",
  },
  {
    id: "TXN-002",
    agent: "David Okoro",
    avatar: "/avatars/avatar-2.jpg",
    project: "Luxury Villa",
    amount: "₦400,000",
    status: "Released",
    date: "Mar 3, 2026",
  },
  {
    id: "TXN-003",
    agent: "Mei Chen",
    avatar: "/avatars/avatar-3.jpg",
    project: "Office Desk",
    amount: "₦1,200,000",
    status: "Released",
    date: "Mar 3, 2026",
  },
];

const disputes: Dispute[] = [
  {
    id: "DSP-001",
    customer: "Aisha Bello",
    agent: "Mei Chen",
    project: "Eco Office Layout",
    amount: "₦1,200,000",
    date: "Mar 2, 2026",
    status: "Under Review",
    notes: "Layout issue raised",
  },
  {
    id: "DSP-002",
    customer: "Aisha Bello",
    agent: "Mei Chen",
    project: "Eco Office Layout",
    amount: "₦1,200,000",
    date: "Mar 2, 2026",
    status: "Under Review",
    notes: "Customer unhappy with revisions",
  },
];

const refunds: Refund[] = [
  {
    id: "RF-001",
    customer: "Carlos Ramirez",
    project: "Renovation Plan",
    amount: "₦900,000",
    status: "Completed",
    date: "Mar 1, 2026",
    reason: "Cancelled by customer request",
  },
  {
    id: "RF-002",
    customer: "Aisha Bello",
    project: "Smart Home Layout",
    amount: "₦1,200,000",
    status: "Partial Refund",
    date: "Feb 28, 2026",
    reason: "Cancelled after dispute",
  },
];

export default function TransactionsTable({
  activeTab,
}: {
  activeTab: string;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const tab = activeTab?.trim().toLowerCase();
  const isCustomerTransactions = tab === "customer transactions";
  const isAgentPayouts = tab.includes("agent payout");
  const isDisputed = tab === "disputed";
  const isRefunds = tab === "refunds";

  const actionButton = (id: string) => (
    <td className="p-3 relative">
      <button
        onClick={() => setOpenMenuId(openMenuId === id ? null : id)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
        aria-label="Open row actions"
      >
        <MoreHorizontal size={18} />
      </button>

      {openMenuId === id && (
        <div className="absolute right-4 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <button
            type="button"
            onClick={() => setOpenMenuId(null)}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            View Details
          </button>
        </div>
      )}
    </td>
  );

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden rounded-2xl border border-[#e6e8f2] bg-white shadow-sm text-[#1a1a2e]"
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm lg:min-w-full">
          <thead className="bg-[#1a1a2e] text-white">
            <tr>
              {isAgentPayouts ? (
                <>
                  <th className="p-3 text-left">Payout ID</th>
                  <th className="p-3 text-left">Agent Name</th>
                  <th className="p-3 text-left">Project/Product</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3">Action</th>
                </>
              ) : isDisputed ? (
                <>
                  <th className="p-3 text-left">Dispute ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Agent Name</th>
                  <th className="p-3 text-left">Project/Product</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Dispute Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Notes</th>
                  <th className="p-3">Action</th>
                </>
              ) : isRefunds ? (
                <>
                  <th className="p-3 text-left">Refund ID</th>
                  <th className="p-3 text-left">Customer Name</th>
                  <th className="p-3 text-left">Project/Product</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Refund Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3">Action</th>
                </>
              ) : (
                <>
                  <th className="p-3 text-left">Transaction ID</th>
                  <th className="p-3 text-left">Customer Name</th>
                  <th className="p-3 text-left">Project/Product</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Payment Method</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3"></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {isAgentPayouts &&
              agentPayouts.map((payout) => (
                <tr key={payout.id} className="border-b">
                  <td className="px-3 py-4 whitespace-nowrap font-semibold text-[#1a1a2e]">
                    {payout.id}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                        <img
                          src={payout.avatar}
                          alt={payout.agent}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-[#1a1a2e]">
                        {payout.agent}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{payout.project}</td>
                  <td className="p-3">{payout.amount}</td>
                  <td className="p-3">
                    <StatusBadge status={payout.status} />
                  </td>
                  <td className="p-3">{payout.date}</td>
                  {actionButton(payout.id)}
                </tr>
              ))}

            {isDisputed &&
              disputes.map((dispute) => (
                <tr key={dispute.id} className="border-b">
                  <td className="px-3 py-4 whitespace-nowrap font-semibold text-[#1a1a2e]">
                    {dispute.id}
                  </td>
                  <td className="p-3">{dispute.customer}</td>
                  <td className="p-3">{dispute.agent}</td>
                  <td className="p-3">{dispute.project}</td>
                  <td className="p-3">{dispute.amount}</td>
                  <td className="p-3">{dispute.date}</td>
                  <td className="p-3">
                    <StatusBadge status={dispute.status} />
                  </td>
                  <td className="p-3">{dispute.notes}</td>
                  {actionButton(dispute.id)}
                </tr>
              ))}

            {isRefunds &&
              refunds.map((refund) => (
                <tr key={refund.id} className="border-b">
                  <td className="px-3 py-4 whitespace-nowrap font-semibold text-[#1a1a2e]">
                    {refund.id}
                  </td>
                  <td className="p-3">{refund.customer}</td>
                  <td className="p-3">{refund.project}</td>
                  <td className="p-3">{refund.amount}</td>
                  <td className="p-3">
                    <StatusBadge status={refund.status} />
                  </td>
                  <td className="p-3">{refund.date}</td>
                  <td className="p-3">{refund.reason}</td>
                  {actionButton(refund.id)}
                </tr>
              ))}

            {!isAgentPayouts && !isDisputed && !isRefunds &&
              customerTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-3 py-4 whitespace-nowrap font-semibold text-[#1a1a2e]">
                    {transaction.id}
                  </td>
                  <td className="p-3">{transaction.customer}</td>
                  <td className="p-3">{transaction.project}</td>
                  <td className="p-3">{transaction.category}</td>
                  <td className="p-3">{transaction.amount}</td>
                  <td className="p-3">{transaction.method}</td>
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">
                    <StatusBadge status={transaction.status} />
                  </td>
                  {actionButton(transaction.id)}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}