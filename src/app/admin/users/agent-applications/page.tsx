"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { agentService } from "@/src/services/agentService";
import { Search, Filter, CheckCircle, XCircle, Clock, FileText, X, Download, ShieldCheck, Mail, Calendar, User, Briefcase, Eye } from "lucide-react";

export default function AgentApplicationsPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [businessType, setBusinessType] = useState("All");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer & detail state
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal and action states
  const [actionModal, setActionModal] = useState<{
    type: "approve" | "reject";
    agentId: string;
    agentName?: string;
  } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [activeTab, search, businessType]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3000);
  };

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

  const loadAgentDetail = async (agent: any) => {
    setDetailLoading(true);
    setSelectedAgent(agent);
    const res = await agentService.getAgentById(agent.id);
    if (res && res.success !== false) {
      setSelectedAgent(res);
    } else {
      showToast("error", "Failed to load agent profile details.");
    }
    setDetailLoading(false);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    const res = await agentService.approveAgent(id);
    if (res && res.success !== false) {
      showToast("success", "Agent approved successfully!");
      setSelectedAgent(null);
      setActionModal(null);
      fetchApplications();
    } else {
      showToast("error", res.message || "Failed to approve agent.");
    }
    setActionLoading(false);
  };

  const handleReject = async (id: string, reason: string) => {
    if (!reason.trim()) {
      showToast("error", "Rejection reason is required.");
      return;
    }
    setActionLoading(true);
    const res = await agentService.rejectAgent(id, reason);
    if (res && res.success !== false) {
      showToast("success", "Agent application rejected.");
      setSelectedAgent(null);
      setActionModal(null);
      setRejectionReason("");
      fetchApplications();
    } else {
      showToast("error", res.message || "Failed to reject agent.");
    }
    setActionLoading(false);
  };

  return (
    <AdminLayout>
      {/* Toast Alert */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all animate-in slide-in-from-bottom-4 duration-300 ${
            toastMsg.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toastMsg.type === "success" ? "✓" : "✕"} {toastMsg.text}
        </div>
      )}

      <div className="space-y-6 relative">
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
                  <th className="px-6 py-4 font-medium">SUBMISSION DATE</th>
                  <th className="px-6 py-4 font-medium">STATUS</th>
                  <th className="px-6 py-4 font-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                      Processing applications...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                      No applications found for this filter.
                    </td>
                  </tr>
                ) : (
                  applications.map((app, i) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-[#1a1a2e] font-medium">{i + 1}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                            {app.name?.charAt(0) || "A"}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1a1a2e]">{app.name}</p>
                            <p className="text-[11px] text-gray-600">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-700 font-medium">{app.businessType || "Building Designer"}</td>
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
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => loadAgentDetail(app)}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-[#1a1a2e] hover:bg-gray-50 rounded-lg text-xs font-bold shadow-sm transition-all"
                          >
                            <Eye size={12} />
                            View KYC & Profile
                          </button>
                          {app.status === "Pending" && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActionModal({ type: "approve", agentId: app.id, agentName: app.name })}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm transition-all"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setRejectionReason("");
                                  setActionModal({ type: "reject", agentId: app.id, agentName: app.name });
                                }}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-sm transition-all"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE DRAWER FOR KYC & DETAILS */}
        {selectedAgent && (
          <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm transition-all">
            <div className="w-full max-w-lg bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#1a1a2e] text-white">
                <div>
                  <h3 className="text-lg font-bold">Agent KYC Details</h3>
                  <p className="text-xs text-gray-300">Review documents and profile info.</p>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {detailLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC700]"></div>
                    <span className="text-xs text-gray-500 font-semibold">Retrieving secure details...</span>
                  </div>
                ) : (
                  <>
                    {/* User profile card */}
                    <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-extrabold text-lg shadow-md">
                        {selectedAgent.user?.firstName?.[0] || selectedAgent.name?.charAt(0) || "A"}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a1a2e] text-base">
                          {selectedAgent.user ? `${selectedAgent.user.firstName} ${selectedAgent.user.lastName}` : selectedAgent.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                          <Mail size={12} />
                          {selectedAgent.user?.email || selectedAgent.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                          <Briefcase size={12} />
                          {selectedAgent.profile?.preferredTitle || "Professional Agent"}
                        </div>
                      </div>
                    </div>

                    {/* Profile & Business Info */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">Professional Profile</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                          <span className="text-[10px] text-gray-400 uppercase font-bold">Years of Experience</span>
                          <p className="text-sm font-bold text-[#1a1a2e] mt-0.5">{selectedAgent.profile?.yearsOfExperience ?? "Not specified"}</p>
                        </div>
                        <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                          <span className="text-[10px] text-gray-400 uppercase font-bold">License Number</span>
                          <p className="text-sm font-bold text-[#1a1a2e] mt-0.5">{selectedAgent.profile?.licenseNumber ?? "None/No License required"}</p>
                        </div>
                      </div>

                      {selectedAgent.profile?.portfolioLink && (
                        <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold">Portfolio Link</span>
                            <p className="text-sm font-semibold text-blue-600 truncate max-w-[280px] mt-0.5">{selectedAgent.profile.portfolioLink}</p>
                          </div>
                          <a
                            href={selectedAgent.profile.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#1a1a2e] bg-[#FFC700] px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all"
                          >
                            Visit
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Bank Details */}
                    {selectedAgent.kycRecords?.[0] && (
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">Bank Details & Payout Account</h5>
                        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-2.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500 font-medium">Bank Name</span>
                            <span className="font-bold text-[#1a1a2e]">{selectedAgent.kycRecords[0].bankName || "N/A"}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500 font-medium">Account Number</span>
                            <span className="font-bold text-[#1a1a2e]">{selectedAgent.kycRecords[0].accountNumber || "N/A"}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500 font-medium">Account Holder</span>
                            <span className="font-bold text-[#1a1a2e]">{selectedAgent.kycRecords[0].accountHolderName || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Uploaded Documents */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">Uploaded KYC Documents</h5>
                      <div className="space-y-2">
                        {/* ID Document */}
                        {selectedAgent.kycRecords?.[0]?.idDocument ? (
                          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText size={18} />
                              </div>
                              <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">ID Type: {selectedAgent.kycRecords[0].idType || "ID Card"}</span>
                                <p className="text-xs font-bold text-[#1a1a2e] mt-0.5">Government ID Document</p>
                              </div>
                            </div>
                            <a
                              href={selectedAgent.kycRecords[0].idDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:text-[#1a1a2e] transition-colors"
                            >
                              <Download size={14} />
                            </a>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 italic">No government ID document uploaded.</p>
                        )}

                        {/* License / Architect Cert */}
                        {selectedAgent.kycRecords?.[0]?.architectCert ? (
                          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText size={18} />
                              </div>
                              <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Professional License</span>
                                <p className="text-xs font-bold text-[#1a1a2e] mt-0.5">Certification Document</p>
                              </div>
                            </div>
                            <a
                              href={selectedAgent.kycRecords[0].architectCert}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:text-[#1a1a2e] transition-colors"
                            >
                              <Download size={14} />
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Actions Footer */}
              {!detailLoading && selectedAgent && (
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                  {selectedAgent.registrationStatus === "awaiting_approval" ||
                  selectedAgent.registrationStatus === "kyc_pending" ||
                  selectedAgent.registrationStatus === "bio_pending" ||
                  selectedAgent.registrationStatus === "profile_pending" ? (
                    <>
                      <button
                        onClick={() => {
                          setRejectionReason("");
                          setActionModal({ type: "reject", agentId: selectedAgent.id, agentName: selectedAgent.name });
                        }}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95"
                      >
                        Reject Registration
                      </button>
                      <button
                        onClick={() => setActionModal({ type: "approve", agentId: selectedAgent.id, agentName: selectedAgent.name })}
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                      >
                        <ShieldCheck size={16} />
                        Approve Profile
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedAgent(null)}
                      className="w-full py-3 border border-gray-200 text-[#1a1a2e] hover:bg-gray-100 font-bold text-sm rounded-xl transition-all"
                    >
                      Close Details
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Confirmation Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
              {actionModal.type === "approve" ? "Approve Agent Registration" : "Reject Agent Registration"}
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {actionModal.type === "approve"
                ? `Are you sure you want to approve ${actionModal.agentName || "this agent"}'s registration? They will be notified and granted access.`
                : `Are you sure you want to reject ${actionModal.agentName || "this agent"}'s registration? Please provide a reason below.`}
            </p>

            {actionModal.type === "reject" && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Rejection Reason
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none text-gray-800 placeholder-gray-400"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActionModal(null);
                  setRejectionReason("");
                }}
                disabled={actionLoading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-55"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (actionModal.type === "approve") {
                    handleApprove(actionModal.agentId);
                  } else {
                    handleReject(actionModal.agentId, rejectionReason);
                  }
                }}
                disabled={actionLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-1.5 ${
                  actionModal.type === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } ${actionLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {actionLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : actionModal.type === "approve" ? (
                  "Approve"
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
