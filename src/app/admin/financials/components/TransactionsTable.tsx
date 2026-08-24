"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, CheckCircle, XCircle, Eye, RefreshCw, AlertCircle, Building2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { financialService } from "@/src/services/financialService";

interface TransactionsTableProps {
  activeTab: string;
  data?: any[];
  onRefresh?: () => void;
}

export default function TransactionsTable({
  activeTab,
  data: propData,
  onRefresh,
}: TransactionsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalType, setModalType] = useState<"approve" | "reject" | "details" | null>(null);
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayData = propData && propData.length > 0 ? propData : [];

  const tab = activeTab?.trim().toLowerCase();
  const isCustomerTransactions = tab === "customer transactions";
  const isAgentPayouts = tab.includes("agent payout");
  const isDisputed = tab === "disputed";
  const isRefunds = tab === "refunds";
  const isVendorWithdrawals = tab === "vendor withdrawals";

  const currentTransactions = isCustomerTransactions
    ? displayData.map((t) => ({
        id: t.id,
        customer:
          typeof t.customer === "string"
            ? t.customer
            : t.customer?.firstName
            ? `${t.customer.firstName} ${t.customer.lastName}`
            : t.customer?.name || t.userName || t.customerName || "N/A",
        project:
          t.project?.title || t.projectTitle || t.projectName || t.project || "Marketplace Order",
        category: t.category || (t.isProductDesign ? "Product Design" : "General"),
        amount: `₦${Number(t.amount || 0).toLocaleString()}`,
        method: t.method || t.paymentMethod || "N/A",
        date: t.date || t.createdAt ? new Date(t.date || t.createdAt).toLocaleDateString() : "N/A",
        status: t.status || "Completed",
      }))
    : [];

  const currentPayouts = isAgentPayouts
    ? displayData.map((p) => ({
        id: p.id,
        agent: p.agent?.firstName
          ? `${p.agent.firstName} ${p.agent.lastName}`
          : p.agent?.name || p.agentName || p.agent || "N/A",
        avatar: p.avatar || p.agent?.profilePicture || null,
        project: p.project || p.project?.title || p.projectTitle || "Vendor Withdrawal",
        amount: `₦${Number(p.amount || 0).toLocaleString()}`,
        rawAmount: Number(p.amount || 0),
        status: p.status || "Pending",
        accountDetails: p.accountDetails || "N/A",
        autoProcess: Boolean(p.autoProcess),
        adminNotes: p.adminNotes,
        paystackReference: p.paystackReference,
        date: p.date || p.createdAt ? new Date(p.date || p.createdAt).toLocaleDateString() : "N/A",
      }))
    : [];

  const currentDisputes = isDisputed
    ? displayData.map((d) => ({
        id: d.id,
        customer: d.customer?.name || "N/A",
        agent: d.agent?.name || "N/A",
        project: d.project?.title || "N/A",
        amount: `₦${Number(d.amount || 0).toLocaleString()}`,
        date: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "N/A",
        status: d.status || "Open",
        notes: d.reason || "N/A",
      }))
    : [];

  const currentRefunds = isRefunds
    ? displayData.map((r) => ({
        id: r.id,
        customer: r.customer?.name || "N/A",
        project: r.project?.title || "N/A",
        amount: `₦${Number(r.amount || 0).toLocaleString()}`,
        status: r.status || "Completed",
        date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A",
        reason: r.reason || "N/A",
      }))
    : [];

  const currentWithdrawals = isVendorWithdrawals
    ? (displayData as any).flatMap((v: any) =>
        (v.withdrawals || []).map((w: any) => ({
          id: w.id,
          vendor: v.vendorName || "Unknown",
          amount: `₦${Number(w.amount).toLocaleString()}`,
          rawAmount: Number(w.amount),
          status: w.status,
          accountDetails: w.accountDetails || "N/A",
          autoProcess: Boolean(w.autoProcess),
          adminNotes: w.adminNotes,
          reference: w.paystackReference || "N/A",
          date: new Date(w.createdAt).toLocaleDateString(),
        }))
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApprove = async () => {
    if (!selectedItem) return;
    setActionLoading(true);
    const res = await financialService.approveWithdrawal(selectedItem.id, adminNotes);
    setActionLoading(false);
    setModalType(null);
    setSelectedItem(null);
    setAdminNotes("");
    if (res && !res.error && onRefresh) {
      onRefresh();
    }
  };

  const handleReject = async () => {
    if (!selectedItem || !adminNotes.trim()) {
      alert("Please provide a reason for rejecting this withdrawal.");
      return;
    }
    setActionLoading(true);
    const res = await financialService.rejectWithdrawal(selectedItem.id, adminNotes);
    setActionLoading(false);
    setModalType(null);
    setSelectedItem(null);
    setAdminNotes("");
    if (res && !res.error && onRefresh) {
      onRefresh();
    }
  };

  const actionButton = (id: string, item?: any) => {
    const isPending = item?.status === "Pending";
    return (
      <td className="p-3 relative">
        <button
          onClick={() => setOpenMenuId(openMenuId === id ? null : id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors border-0 cursor-pointer"
          aria-label="Open row actions"
        >
          <MoreHorizontal size={18} />
        </button>

        {openMenuId === id && (
          <div className="absolute right-4 top-full z-20 mt-1 w-48 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl py-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setOpenMenuId(null);
                setSelectedItem(item);
                setModalType("details");
              }}
              className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 font-semibold flex items-center gap-2 border-0 bg-transparent cursor-pointer"
            >
              <Eye size={14} className="text-gray-400" />
              View Details
            </button>

            {(isAgentPayouts || isVendorWithdrawals) && isPending && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    setSelectedItem(item);
                    setAdminNotes("");
                    setModalType("approve");
                  }}
                  className="w-full px-4 py-2.5 text-left text-emerald-700 hover:bg-emerald-50 font-bold flex items-center gap-2 border-0 bg-transparent cursor-pointer"
                >
                  <CheckCircle size={14} className="text-emerald-600" />
                  Approve & Mark Paid
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    setSelectedItem(item);
                    setAdminNotes("");
                    setModalType("reject");
                  }}
                  className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 border-0 bg-transparent cursor-pointer"
                >
                  <XCircle size={14} className="text-red-500" />
                  Reject & Refund
                </button>
              </>
            )}

            {isVendorWithdrawals && item?.status === "Failed" && (
              <button
                type="button"
                onClick={async () => {
                  setOpenMenuId(null);
                  if (confirm("Are you sure you want to retry this automated withdrawal transfer?")) {
                    await financialService.retryWithdrawal(id);
                    if (onRefresh) onRefresh();
                  }
                }}
                className="w-full px-4 py-2.5 text-left text-blue-600 hover:bg-blue-50 font-bold flex items-center gap-2 border-t border-gray-100 bg-transparent cursor-pointer"
              >
                <RefreshCw size={14} className="text-blue-500" />
                Retry Transfer
              </button>
            )}
          </div>
        )}
      </td>
    );
  };

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
                  <th className="p-3 text-left">Agent / Vendor</th>
                  <th className="p-3 text-left">Bank Account</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Mode</th>
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
                  <th className="p-3 text-left">Bank Account</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Mode</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
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
            {isAgentPayouts &&
              (currentPayouts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-500 font-medium">
                    No vendor payouts recorded
                  </td>
                </tr>
              ) : (
                currentPayouts.map((payout, i) => (
                  <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                      {i + 1}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {payout.avatar ? (
                          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                            <img
                              src={payout.avatar}
                              alt={payout.agent}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-bold text-xs shadow-sm flex-shrink-0">
                            {payout.agent?.charAt(0)?.toUpperCase() || "V"}
                          </div>
                        )}
                        <span className="font-semibold text-[#1a1a2e]">{payout.agent}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600 font-medium text-xs max-w-[200px] truncate">
                      {payout.accountDetails || "Verified Account"}
                    </td>
                    <td className="p-3 text-[#1a1a2e] font-bold">{payout.amount}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          payout.autoProcess
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {payout.autoProcess ? "Auto Queue" : "Manual Review"}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={payout.status} />
                    </td>
                    <td className="p-3 text-gray-600 font-medium">{payout.date}</td>
                    {actionButton(payout.id, payout)}
                  </tr>
                ))
              ))}

            {isVendorWithdrawals &&
              (currentWithdrawals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-500 font-medium">
                    No vendor withdrawals found
                  </td>
                </tr>
              ) : (
                currentWithdrawals.map((withdrawal: any, i: number) => (
                  <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-4 whitespace-nowrap font-bold text-[#1a1a2e]">
                      {i + 1}
                    </td>
                    <td className="p-3 font-semibold text-[#1a1a2e]">{withdrawal.vendor}</td>
                    <td className="p-3 text-gray-600 font-medium text-xs max-w-[200px] truncate">
                      {withdrawal.accountDetails || "Verified Account"}
                    </td>
                    <td className="p-3 text-[#1a1a2e] font-bold">{withdrawal.amount}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          withdrawal.autoProcess
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {withdrawal.autoProcess ? "Auto Queue" : "Manual Review"}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={withdrawal.status} />
                    </td>
                    <td className="p-3 text-gray-600 font-medium">{withdrawal.date}</td>
                    {actionButton(withdrawal.id, withdrawal)}
                  </tr>
                ))
              ))}

            {isDisputed &&
              (currentDisputes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-10 text-center text-gray-500 font-medium">
                    No disputes found
                  </td>
                </tr>
              ) : (
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
                ))
              ))}

            {isRefunds &&
              (currentRefunds.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-500 font-medium">
                    No refunds found
                  </td>
                </tr>
              ) : (
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
                ))
              ))}

            {!isAgentPayouts &&
              !isDisputed &&
              !isRefunds &&
              !isVendorWithdrawals &&
              (currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-10 text-center text-gray-500 font-medium">
                    No transactions found
                  </td>
                </tr>
              ) : (
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
                ))
              ))}
          </tbody>
        </table>
      </div>

      {/* ── MODAL: APPROVE & MARK PAID ── */}
      {modalType === "approve" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a1a2e] m-0">Approve Vendor Withdrawal</h3>
                <p className="text-xs text-gray-500 m-0">Confirm disbursement of funds to vendor</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Vendor:</span>
                <span className="font-bold text-[#1a1a2e]">{selectedItem.agent || selectedItem.vendor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-emerald-600 text-sm">{selectedItem.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bank Details:</span>
                <span className="font-medium text-right max-w-[220px] truncate">{selectedItem.accountDetails}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Processing Mode:</span>
                <span className="font-bold">{selectedItem.autoProcess ? "Automated Paystack Queue" : "Manual Bank Transfer"}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Admin Payment Reference / Note (Optional):
              </label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Paid via Bank Transfer Ref: #123456"
                className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalType(null)}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl border-0 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl border-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                {actionLoading && <RefreshCw size={13} className="animate-spin" />}
                <span>{selectedItem.autoProcess ? "Approve & Trigger Auto-Payout" : "Confirm & Mark Paid"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: REJECT & REFUND ── */}
      {modalType === "reject" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <XCircle size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a1a2e] m-0">Reject Withdrawal & Refund</h3>
                <p className="text-xs text-gray-500 m-0">Reverse funds back to vendor wallet</p>
              </div>
            </div>

            <div className="bg-red-50/70 border border-red-200 p-3 rounded-xl flex items-start gap-2 text-xs text-red-800">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <span>
                Rejecting this request will immediately refund <strong>{selectedItem.amount}</strong> back to the vendor&apos;s wallet balance and notify them.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Reason for Rejection <span className="text-red-500">*</span>:
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Account number mismatch or KYC verification needed"
                rows={3}
                className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalType(null)}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl border-0 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={actionLoading || !adminNotes.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl border-0 cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {actionLoading && <RefreshCw size={13} className="animate-spin" />}
                <span>Reject & Refund Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: VIEW DETAILS ── */}
      {modalType === "details" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1a2e] m-0">Withdrawal Transaction Details</h3>
                  <p className="text-xs text-gray-500 m-0">Full record information</p>
                </div>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold border-0 bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-500 block text-[11px]">Vendor / Agent</span>
                <span className="font-bold text-[#1a1a2e] mt-0.5 block">{selectedItem.agent || selectedItem.vendor || "N/A"}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-500 block text-[11px]">Requested Amount</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">{selectedItem.amount}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl col-span-2">
                <span className="text-gray-500 block text-[11px]">Bank Account Information</span>
                <span className="font-bold text-[#1a1a2e] mt-0.5 block">{selectedItem.accountDetails || "Verified Account"}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-500 block text-[11px]">Status</span>
                <span className="font-bold text-[#1a1a2e] mt-0.5 block">{selectedItem.status}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-500 block text-[11px]">Processing Mode</span>
                <span className="font-bold text-[#1a1a2e] mt-0.5 block">{selectedItem.autoProcess ? "Automated Paystack" : "Manual Admin Vetting"}</span>
              </div>
              {selectedItem.paystackReference && (
                <div className="bg-gray-50 p-3 rounded-xl col-span-2">
                  <span className="text-gray-500 block text-[11px]">Paystack Reference</span>
                  <span className="font-mono text-[#1a1a2e] mt-0.5 block">{selectedItem.paystackReference}</span>
                </div>
              )}
              {selectedItem.adminNotes && (
                <div className="bg-gray-50 p-3 rounded-xl col-span-2">
                  <span className="text-gray-500 block text-[11px]">Admin Notes</span>
                  <span className="font-medium text-gray-700 mt-0.5 block">{selectedItem.adminNotes}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1a1a2e] hover:bg-[#2a2a4e] rounded-xl border-0 cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}