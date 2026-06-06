"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { financialService } from "@/src/services/financialService";

interface TransactionsTableProps {
  activeTab: string;
  data?: any[];
}

export default function TransactionsTable({
  activeTab,
  data: propData
}: TransactionsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayData = propData && propData.length > 0 ? propData : [];
  
  const tab = activeTab?.trim().toLowerCase();
  const isCustomerTransactions = tab === "customer transactions";
  const isAgentPayouts = tab.includes("agent payout");
  const isDisputed = tab === "disputed";
  const isRefunds = tab === "refunds";
  const isVendorWithdrawals = tab === "vendor withdrawals";

  const currentTransactions = isCustomerTransactions ? displayData.map(t => ({
    id: t.id,
    customer: t.customer?.firstName ? `${t.customer.firstName} ${t.customer.lastName}` : (t.customer?.name || t.userName || t.customerName || "N/A"),
    project: t.project?.title || t.projectTitle || t.projectName || "Marketplace Order",
    category: t.category || (t.isProductDesign ? "Product Design" : "General"),
    amount: `₦${t.amount?.toLocaleString() || "0"}`,
    method: t.paymentMethod || "N/A",
    date: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "N/A",
    status: t.status || "Completed"
  })) : [];

  const currentPayouts = isAgentPayouts ? displayData.map(p => ({
    id: p.id,
    agent: p.agent?.firstName ? `${p.agent.firstName} ${p.agent.lastName}` : (p.agent?.name || p.agentName || "N/A"),
    avatar: p.agent?.profilePicture || "https://i.pravatar.cc/100",
    project: p.project?.title || p.projectTitle || p.projectName || "N/A",
    amount: `₦${p.amount?.toLocaleString() || "0"}`,
    status: p.status || "Pending",
    date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"
  })) : [];

  const currentDisputes = isDisputed ? displayData.map(d => ({
    id: d.id,
    customer: d.customer?.name || "N/A",
    agent: d.agent?.name || "N/A",
    project: d.project?.title || "N/A",
    amount: `₦${d.amount?.toLocaleString() || "0"}`,
    date: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "N/A",
    status: d.status || "Open",
    notes: d.reason || "N/A"
  })) : [];

  const currentRefunds = isRefunds ? displayData.map(r => ({
    id: r.id,
    customer: r.customer?.name || "N/A",
    project: r.project?.title || "N/A",
    amount: `₦${r.amount?.toLocaleString() || "0"}`,
    status: r.status || "Completed",
    date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A",
    reason: r.reason || "N/A"
  })) : [];

  const currentWithdrawals = isVendorWithdrawals ? (displayData as any).flatMap((v: any) => 
    (v.withdrawals || []).map((w: any) => ({
      id: w.id,
      vendor: v.vendorName || "Unknown",
      amount: `₦${Number(w.amount).toLocaleString()}`,
      status: w.status,
      date: new Date(w.createdAt).toLocaleDateString(),
      reference: w.paystackReference || "N/A"
    }))
  ) : [];

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

  const actionButton = (id: string, item?: any) => (
    <td className="p-3 relative">
      <button
        onClick={() => setOpenMenuId(openMenuId === id ? null : id)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
        aria-label="Open row actions"
      >
        <MoreHorizontal size={18} />
      </button>

      {openMenuId === id && (
        <div className="absolute right-4 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <button
            type="button"
            onClick={() => setOpenMenuId(null)}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 font-medium"
          >
            View Details
          </button>
          
          {isVendorWithdrawals && item?.status === 'Failed' && (
            <button
              type="button"
              onClick={async () => {
                setOpenMenuId(null);
                if (confirm('Are you sure you want to retry this withdrawal?')) {
                  await financialService.retryWithdrawal(id);
                  window.location.reload();
                }
              }}
              className="w-full px-4 py-3 text-left text-sm text-blue-600 hover:bg-gray-100 font-medium border-t border-gray-50"
            >
              Retry Transfer
            </button>
          )}
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
                  <th className="p-3 text-left">No.</th>
                  <th className="p-3 text-left">Agent Name</th>
                  <th className="p-3 text-left">Project/Product</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3">Action</th>
                </>
              ) : isDisputed ? (
                <>
                  <th className="p-3 text-left">No.</th>
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
                  <th className="p-3 text-left">No.</th>
                  <th className="p-3 text-left">Customer Name</th>
                  <th className="p-3 text-left">Project/Product</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Refund Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3">Action</th>
                </>
              ) : isVendorWithdrawals ? (
                <>
                  <th className="p-3 text-left">No.</th>
                  <th className="p-3 text-left">Vendor Name</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Reference</th>
                  <th className="p-3">Action</th>
                </>
              ) : (
                <>
                  <th className="p-3 text-left">No.</th>
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
          <tbody className="divide-y divide-gray-100">
            {isAgentPayouts && (currentPayouts.length === 0 ? <tr><td colSpan={7} className="p-10 text-center text-gray-600 font-medium">No payouts found</td></tr> :
              currentPayouts.map((payout, i) => (
                <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                    {i + 1}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                        <img
                          src={payout.avatar}
                          alt={payout.agent}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-[#1a1a2e]">
                        {payout.agent}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700 font-medium">{payout.project}</td>
                  <td className="p-3 text-[#1a1a2e] font-bold">{payout.amount}</td>
                  <td className="p-3">
                    <StatusBadge status={payout.status} />
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{payout.date}</td>
                  {actionButton(payout.id, payout)}
                </tr>
              )))}

            {isDisputed && (currentDisputes.length === 0 ? <tr><td colSpan={9} className="p-10 text-center text-gray-600 font-medium">No disputes found</td></tr> :
              currentDisputes.map((dispute, i) => (
                <tr key={dispute.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                    {i + 1}
                  </td>
                  <td className="p-3 font-semibold text-[#1a1a2e]">{dispute.customer}</td>
                  <td className="p-3 font-semibold text-[#1a1a2e]">{dispute.agent}</td>
                  <td className="p-3 text-gray-700 font-medium">{dispute.project}</td>
                  <td className="p-3 text-red-600 font-bold">{dispute.amount}</td>
                  <td className="p-3 text-gray-600 font-medium">{dispute.date}</td>
                  <td className="p-3">
                    <StatusBadge status={dispute.status} />
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{dispute.notes}</td>
                  {actionButton(dispute.id, dispute)}
                </tr>
              )))}

            {isRefunds && (currentRefunds.length === 0 ? <tr><td colSpan={8} className="p-10 text-center text-gray-600 font-medium">No refunds found</td></tr> :
              currentRefunds.map((refund, i) => (
                <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                    {i + 1}
                  </td>
                  <td className="p-3 font-semibold text-[#1a1a2e]">{refund.customer}</td>
                  <td className="p-3 text-gray-700 font-medium">{refund.project}</td>
                  <td className="p-3 text-red-600 font-bold">{refund.amount}</td>
                  <td className="p-3">
                    <StatusBadge status={refund.status} />
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{refund.date}</td>
                  <td className="p-3 text-gray-600 font-medium">{refund.reason}</td>
                  {actionButton(refund.id, refund)}
                </tr>
              )))}

            {isVendorWithdrawals && (currentWithdrawals.length === 0 ? <tr><td colSpan={7} className="p-10 text-center text-gray-600 font-medium">No withdrawals found</td></tr> :
              currentWithdrawals.map((withdrawal: any, i: number) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                    {i + 1}
                  </td>
                  <td className="p-3 font-semibold text-[#1a1a2e]">{withdrawal.vendor}</td>
                  <td className="p-3 text-[#1a1a2e] font-bold">{withdrawal.amount}</td>
                  <td className="p-3">
                    <StatusBadge status={withdrawal.status} />
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{withdrawal.date}</td>
                  <td className="p-3 text-gray-500 font-medium">{withdrawal.reference}</td>
                  {actionButton(withdrawal.id, withdrawal)}
                </tr>
              )))}

            {!isAgentPayouts && !isDisputed && !isRefunds && (currentTransactions.length === 0 ? <tr><td colSpan={9} className="p-10 text-center text-gray-600 font-medium">No transactions found</td></tr> :
              currentTransactions.map((transaction, i) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                    {i + 1}
                  </td>
                  <td className="p-3 font-semibold text-[#1a1a2e]">{transaction.customer}</td>
                  <td className="p-3 text-gray-700 font-medium">{transaction.project}</td>
                  <td className="p-3 text-gray-700 font-medium">{transaction.category}</td>
                  <td className="p-3 text-blue-600 font-bold">{transaction.amount}</td>
                  <td className="p-3 text-gray-700 font-medium">{transaction.method}</td>
                  <td className="p-3 text-gray-600 font-medium">{transaction.date}</td>
                  <td className="p-3">
                    <StatusBadge status={transaction.status} />
                  </td>
                  {actionButton(transaction.id, transaction)}
                </tr>
              )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}