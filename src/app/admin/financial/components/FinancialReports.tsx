"use client";

import React, { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  Download,
  TrendingUp,
  Filter,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Api from "@/src/Utils/Api";

const formatDate = (date: Date, pattern: string) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const sec = pad(date.getSeconds());
  return pattern
    .replace("yyyy", String(y))
    .replace("MM", m)
    .replace("dd", d)
    .replace("HH", h)
    .replace("mm", min)
    .replace("ss", sec);
};

interface WithdrawalSummary {
  totalWithdrawals: number;
  totalAmount: number;
  byStatus: Record<string, number>;
  byStatusAmount: Record<string, number>;
}

interface VendorSummary {
  vendorName: string;
  vendorId: string;
  totalRequested: number;
  totalApproved: number;
  totalTransferred: number;
  totalRejected: number;
  requestCount: number;
  withdrawals: Array<{
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    paystackReference?: string;
  }>;
}

interface FinancialReport {
  dateRange: { startDate: string; endDate: string };
  totalVendors: number;
  totalWithdrawals: number;
  totalAmount: number;
  vendorSummary: VendorSummary[];
}

export default function FinancialReports() {
  const [summary, setSummary] = useState<WithdrawalSummary | null>(null);
  const [reports, setReports] = useState<FinancialReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getDefaultStartDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return formatDate(d, "yyyy-MM-dd");
  };
  const [startDate, setStartDate] = useState(getDefaultStartDate);
  const [endDate, setEndDate] = useState(() => formatDate(new Date(), "yyyy-MM-dd"));
  const [tab, setTab] = useState<"summary" | "detailed">("summary");

  useEffect(() => {
    fetchData();
  }, []);

  const getAuthHeader = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const summaryRes = await Api.get(
        "/wallet/admin/financials/withdrawal-summary",
        { headers: getAuthHeader() },
      );
      setSummary(summaryRes.data);
    } catch (err: any) {
      console.error("Error fetching summary:", err);
      setError("Failed to load financial summary");
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    if (!startDate || !endDate) {
      setError("Please select date range");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const reportsRes = await Api.get(
        `/wallet/admin/financials/reports?startDate=${startDate}&endDate=${endDate}`,
        { headers: getAuthHeader() },
      );
      setReports(reportsRes.data);
    } catch (err: any) {
      console.error("Error fetching reports:", err);
      setError("Failed to load financial reports");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!reports) return;
    try {
      const csv = generateCSV(reports);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `withdrawal-report-${startDate}-to-${endDate}.csv`;
      a.click();
    } catch (err) {
      console.error("Error downloading report:", err);
      setError("Failed to download report");
    }
  };

  const generateCSV = (data: FinancialReport) => {
    let csv = "Withdrawal Financial Report\n";
    csv += `Generated: ${formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")}\n`;
    csv += `Period: ${data.dateRange.startDate} to ${data.dateRange.endDate}\n\n`;
    csv += "SUMMARY\n";
    csv += `Total Vendors,${data.totalVendors}\n`;
    csv += `Total Withdrawals,${data.totalWithdrawals}\n`;
    csv += `Total Amount,₦${data.totalAmount.toLocaleString()}\n\n`;
    csv += "VENDOR DETAILS\n";
    csv += "Vendor Name,Total Requested,Approved,Transferred,Rejected,Requests Count\n";
    data.vendorSummary.forEach((vendor) => {
      csv += `"${vendor.vendorName}",₦${vendor.totalRequested},₦${vendor.totalApproved},₦${vendor.totalTransferred},₦${vendor.totalRejected},${vendor.requestCount}\n`;
    });
    return csv;
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Financial Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage multi-vendor withdrawal data
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600 text-sm font-semibold">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab("summary")}
          className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
            tab === "summary"
              ? "text-blue-600 border-b-blue-600"
              : "text-gray-500 border-b-transparent hover:text-gray-700"
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setTab("detailed")}
          className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
            tab === "detailed"
              ? "text-blue-600 border-b-blue-600"
              : "text-gray-500 border-b-transparent hover:text-gray-700"
          }`}
        >
          Detailed Report
        </button>
      </div>

      {/* Summary Tab */}
      {tab === "summary" && (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-sm text-gray-400">Loading summary...</p>
              </div>
            </div>
          ) : summary ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Withdrawals</p>
                      <p className="text-3xl font-bold text-[#1a1a2e] mt-2">{summary.totalWithdrawals}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="text-blue-600" size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                      <p className="text-2xl font-bold text-[#1a1a2e] mt-2">{formatCurrency(summary.totalAmount)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Transferred</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(summary.byStatusAmount.transferred || 0)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-2">{formatCurrency(summary.byStatusAmount.pending || 0)}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <Clock className="text-yellow-600" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-6">Status Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(summary.byStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          status === "transferred" ? "bg-green-500"
                          : status === "approved" ? "bg-blue-500"
                          : status === "pending" ? "bg-yellow-500"
                          : "bg-red-500"
                        }`} />
                        <span className="text-sm font-medium text-gray-600 capitalize">{status}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-[#1a1a2e]">{count}</span>
                        <span className="text-sm text-gray-500">({formatCurrency(summary.byStatusAmount[status] || 0)})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </>
      )}

      {/* Detailed Report Tab */}
      {tab === "detailed" && (
        <>
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-bold text-[#1a1a2e] mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-[#1a1a2e] mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={fetchReports}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white font-bold text-sm rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <><Loader2 size={14} className="animate-spin" />Loading...</>
                ) : (
                  <><Filter size={14} />Generate Report</>
                )}
              </button>
            </div>
          </div>

          {reports ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 font-medium">Total Vendors</p>
                  <p className="text-3xl font-bold text-[#1a1a2e] mt-2">{reports.totalVendors}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 font-medium">Total Requests</p>
                  <p className="text-3xl font-bold text-[#1a1a2e] mt-2">{reports.totalWithdrawals}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                  <p className="text-2xl font-bold text-[#1a1a2e] mt-2">{formatCurrency(reports.totalAmount)}</p>
                </div>
              </div>

              <button
                onClick={downloadReport}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white font-bold text-sm rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download size={14} />
                Download CSV Report
              </button>

              <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-gray-700">Vendor Name</th>
                      <th className="px-6 py-4 text-right font-bold text-gray-700">Total Requested</th>
                      <th className="px-6 py-4 text-right font-bold text-gray-700">Approved</th>
                      <th className="px-6 py-4 text-right font-bold text-gray-700">Transferred</th>
                      <th className="px-6 py-4 text-right font-bold text-gray-700">Rejected</th>
                      <th className="px-6 py-4 text-center font-bold text-gray-700">Requests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.vendorSummary.map((vendor) => (
                      <tr key={vendor.vendorId} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#1a1a2e]">{vendor.vendorName}</td>
                        <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(vendor.totalRequested)}</td>
                        <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(vendor.totalApproved)}</td>
                        <td className="px-6 py-4 text-right text-green-600 font-semibold">{formatCurrency(vendor.totalTransferred)}</td>
                        <td className="px-6 py-4 text-right text-red-600 font-semibold">{formatCurrency(vendor.totalRejected)}</td>
                        <td className="px-6 py-4 text-center text-gray-600">{vendor.requestCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-lg border border-gray-100 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select date range and click &quot;Generate Report&quot;</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
