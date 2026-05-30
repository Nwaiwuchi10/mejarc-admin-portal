"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { agentService } from "@/src/services/agentService";
import { Search, Filter, CheckCircle, XCircle, Clock, FileText } from "lucide-react";

export default function AgentApplicationsPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [businessType, setBusinessType] = useState("All");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [activeTab, search, businessType]);

  const fetchApplications = async () => {
    setLoading(true);
    const res = await agentService.getApplications({
      status: activeTab === "All" ? undefined : activeTab,
      search: search || undefined,
      businessType: businessType === "All" ? undefined : businessType
    });
    if (res && res.data) {
      setApplications(res.data);
    } else {
      setApplications([]);
    }
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    const res = await agentService.approveAgent(id);
    if (res.success) fetchApplications();
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      const res = await agentService.rejectAgent(id, reason);
      if (res.success) fetchApplications();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Agent KYC & Applications</h1>
            <p className="text-sm text-gray-600 mt-1">Review and manage professional agent registrations.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC700] bg-white shadow-sm font-medium pr-8"
            >
              <option value="All">All Categories</option>
              <option value="Building Designer">Building Designer</option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Architect">Architect</option>
              <option value="Structural Engineer">Structural Engineer</option>
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC700] shadow-sm transition-all"
              />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          {["Pending", "Approved", "Rejected", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold transition-all relative ${
                activeTab === tab
                  ? "text-[#1a1a2e]"
                  : "text-gray-600 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFC700] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[24px] border border-[#e6e8f2] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[900px]">
              <thead className="bg-[#1a1a2e] text-white">
                <tr>
                  <th className="px-6 py-4 font-medium">No.</th>
                  <th className="px-6 py-4 font-medium">AGENT NAME</th>
                  <th className="px-6 py-4 font-medium">BUSINESS TYPE</th>
                  <th className="px-6 py-4 font-medium">DOCUMENTS</th>
                  <th className="px-6 py-4 font-medium">SUBMISSION DATE</th>
                  <th className="px-6 py-4 font-medium">STATUS</th>
                  <th className="px-6 py-4 font-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                      Processing applications...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                      No applications found for this filter.
                    </td>
                  </tr>
                ) : (
                  applications.map((app, i) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-[#1a1a2e] font-medium">{i + 1}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                            {app.name?.charAt(0) || "A"}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1a1a2e]">{app.name}</p>
                            <p className="text-[11px] text-gray-600">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-700 font-medium">{app.businessType || "Building Designer"}</td>
                      <td className="px-6 py-5">
                        <button className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                          <FileText size={14} />
                          View KYC docs
                        </button>
                      </td>
                      <td className="px-6 py-5 text-gray-600 font-medium">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          app.status === "Approved" ? "bg-green-100 text-green-700" :
                          app.status === "Rejected" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {app.status === "Approved" && <CheckCircle size={12} />}
                          {app.status === "Rejected" && <XCircle size={12} />}
                          {app.status === "Pending" && <Clock size={12} />}
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {app.status === "Pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-sm transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {app.status !== "Pending" && (
                          <button className="text-gray-600 hover:text-gray-600 font-medium">
                            Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
