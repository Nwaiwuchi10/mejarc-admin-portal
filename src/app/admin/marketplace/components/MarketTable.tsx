"use client";

import { useState, useRef, useEffect } from "react";
import StatusBadge, { MarketStatus } from "./StatusBadge";
import { MoreHorizontal, User, Eye, Check, X, RefreshCw, FileText, Image as ImageIcon, Calendar, DollarSign, Star, Download, ExternalLink } from "lucide-react";
import { marketplaceService } from "@/src/services/marketplaceService";

interface MarketTableProps {
  activeTab: string;
  status: string;
  listings?: any[];
  onRefresh?: () => void;
}

type ModalState = {
  type: "detail" | "approve" | "reject" | "request_change" | null;
  listingId: string | null;
  title?: string;
  data?: any; // For full listing details
};

export default function MarketTable({
  activeTab,
  status,
  listings: propListings,
  onRefresh
}: MarketTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ type: null, listingId: null });
  const [inputText, setInputText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const displayData = propListings && propListings.length > 0 ? propListings.map(l => ({
    id: l.id,
    title: l.title || l.name || "N/A",
    agent: typeof l.agent === "string" ? l.agent : (l.agent?.firstName ? `${l.agent.firstName} ${l.agent.lastName}` : l.agentName || "N/A"),
    date: l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "N/A",
    category: l.category || "N/A",
    value: `₦${l.price?.toLocaleString() || "0"}`,
    status: (l.status === "pending_review" ? "Pending Approval" : l.status === "approved" ? "Approved" : l.status === "rejected" ? "Rejected" : "Pending Approval") as MarketStatus,
    type: l.category === "Building Plan" ? "Building Plan" : "Product Design",
    avatar: l.agentAvatar || null
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

  const handleOpenDetail = async (listingId: string, title: string) => {
    setOpenMenuId(null);
    setDetailLoading(true);
    setModal({ type: "detail", listingId, title, data: null });
    const res = await marketplaceService.getListingById(listingId);
    setDetailLoading(false);
    if (res && res.id) {
      setModal(prev => ({ ...prev, data: res }));
    } else {
      showToast("error", res.message || "Failed to load listing details.");
      setModal({ type: null, listingId: null });
    }
  };

  const handleApprove = async (listingId: string) => {
    setActionLoading(true);
    const res = await marketplaceService.approveListing(listingId);
    setActionLoading(false);
    if (res && res.success !== false) {
      showToast("success", "Listing approved successfully.");
      setModal({ type: null, listingId: null });
      onRefresh?.();
    } else {
      showToast("error", res.message || "Failed to approve listing.");
    }
  };

  const handleReject = async (listingId: string) => {
    if (!inputText.trim()) {
      showToast("error", "Rejection reason is required.");
      return;
    }
    setActionLoading(true);
    const res = await marketplaceService.rejectListing(listingId, inputText);
    setActionLoading(false);
    if (res && res.success !== false) {
      showToast("success", "Listing rejected successfully.");
      setInputText("");
      setModal({ type: null, listingId: null });
      onRefresh?.();
    } else {
      showToast("error", res.message || "Failed to reject listing.");
    }
  };

  const handleRequestChange = async (listingId: string) => {
    if (!inputText.trim()) {
      showToast("error", "Feedback details are required.");
      return;
    }
    setActionLoading(true);
    const res = await marketplaceService.requestChange(listingId, inputText);
    setActionLoading(false);
    if (res && res.success !== false) {
      showToast("success", "Revision request sent successfully.");
      setInputText("");
      setModal({ type: null, listingId: null });
      onRefresh?.();
    } else {
      showToast("error", res.message || "Failed to submit revision request.");
    }
  };

  return (
    <>
      {/* Toast Alert */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all animate-in slide-in-from-bottom-4 duration-300 ${
            toastMsg.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toastMsg.type === "success" ? "✓" : "✕"} {toastMsg.text}
        </div>
      )}

      {/* Confirmation Modals / Detail View */}
      {modal.type === "detail" && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#1a1a2e] text-white rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold">{modal.title || "Listing Details"}</h3>
                <p className="text-gray-300 text-xs mt-1">ID: {modal.listingId}</p>
              </div>
              <button
                onClick={() => setModal({ type: null, listingId: null })}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {detailLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC700]"></div>
                  <span className="text-gray-500 font-medium text-sm">Fetching detailed specifications...</span>
                </div>
              ) : modal.data ? (
                <div className="space-y-8">
                  {/* Images & Basics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Images Section */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Product Images</h4>
                      {modal.data.productImage && modal.data.productImage.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3">
                          <img
                            src={modal.data.productImage[0]}
                            alt={modal.data.title}
                            className="w-full h-64 object-cover rounded-2xl border border-gray-200 shadow-sm"
                          />
                          {modal.data.productImage.length > 1 && (
                            <div className="grid grid-cols-3 gap-2">
                              {modal.data.productImage.slice(1).map((imgUrl: string, idx: number) => (
                                <img
                                  key={idx}
                                  src={imgUrl}
                                  alt="additional product image"
                                  className="w-full h-20 object-cover rounded-xl border border-gray-100"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2">
                          <ImageIcon size={40} />
                          <span className="text-sm font-medium">No Images Provided</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Specs */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Specifications</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Category</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.category || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Plan Type</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.planType || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Bedrooms</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.numBedrooms || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Bathrooms</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.numBathrooms || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Floors</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.numFloors || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Area</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.area || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">Design Style</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.designStyle || "N/A"}</span>
                          </div>
                          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block">File Type</span>
                            <span className="text-sm font-bold text-[#1a1a2e]">{modal.data.fileType || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#FFC700]/10 border border-[#FFC700]/30 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-600 font-semibold block">Market Value / Price</span>
                          <span className="text-2xl font-extrabold text-[#1a1a2e]">₦{modal.data.price?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                          <Star size={16} className="text-[#FFC700] fill-[#FFC700]" />
                          <span className="text-sm font-bold text-gray-800">{modal.data.averageRating || "0.0"}</span>
                          <span className="text-xs text-gray-400">({modal.data.ratingCount || 0})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Description</h4>
                    <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {modal.data.description || "No description provided."}
                    </p>
                  </div>

                  {/* Drawing sets & Add Ons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Included Drawings</h4>
                      {modal.data.drawingSet && modal.data.drawingSet.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {modal.data.drawingSet.map((draw: string, idx: number) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                              {draw}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">None specified</span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Optional Add-ons</h4>
                      {modal.data.addOns && modal.data.addOns.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {modal.data.addOns.map((add: string, idx: number) => (
                            <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-100">
                              {add}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">None specified</span>
                      )}
                    </div>
                  </div>

                  {/* S3 Documents / Uploads */}
                  <div className="space-y-3 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Submitted Blueprint & Design Documents</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 block mb-1">Architectural Plan File</span>
                        {modal.data.architecturalPlan && modal.data.architecturalPlan.length > 0 ? (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText size={18} className="text-blue-500" />
                              <span className="text-xs font-bold text-gray-700 truncate max-w-[180px]">Architectural_Plan.pdf</span>
                            </div>
                            <a
                              href={modal.data.architecturalPlan[0]}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
                            >
                              <Download size={14} /> Open File
                            </a>
                          </div>
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                            No architectural plan submitted
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-gray-500 block mb-1">Structural Plan File</span>
                        {modal.data.structuralPlan && modal.data.structuralPlan.length > 0 ? (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText size={18} className="text-purple-500" />
                              <span className="text-xs font-bold text-gray-700 truncate max-w-[180px]">Structural_Plan.pdf</span>
                            </div>
                            <a
                              href={modal.data.structuralPlan[0]}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition"
                            >
                              <Download size={14} /> Open File
                            </a>
                          </div>
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                            No structural plan submitted
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 bg-white">
                      {modal.data.agent?.user?.profilePicture || modal.data.agent?.profilePicture ? (
                        <img
                          src={modal.data.agent.user.profilePicture || modal.data.agent.profilePicture}
                          alt="Agent Avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-bold text-sm">
                          {modal.data.agent?.user?.firstName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Submitting Agent</span>
                      <span className="text-sm font-extrabold text-[#1a1a2e]">
                        {modal.data.agent?.user?.firstName ? `${modal.data.agent.user.firstName} ${modal.data.agent.user.lastName}` : "Unknown Agent"}
                      </span>
                      <span className="text-xs text-gray-500 block">{modal.data.agent?.user?.email}</span>
                    </div>
                  </div>

                  {/* Inner Modal Review Actions */}
                  {modal.data.status === "pending_review" && (
                    <div className="border-t border-gray-100 pt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setModal({ type: "approve", listingId: modal.listingId, title: modal.title })}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition"
                      >
                        <Check size={16} /> Approve Listing
                      </button>
                      <button
                        onClick={() => setModal({ type: "request_change", listingId: modal.listingId, title: modal.title })}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition"
                      >
                        <RefreshCw size={16} /> Request Changes
                      </button>
                      <button
                        onClick={() => setModal({ type: "reject", listingId: modal.listingId, title: modal.title })}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition"
                      >
                        <X size={16} /> Reject Submission
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500 font-semibold">Failed to retrieve details.</div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end rounded-b-3xl">
              <button
                onClick={() => setModal({ type: null, listingId: null })}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm rounded-xl transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action: Approve Modal */}
      {modal.type === "approve" && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">Approve Marketplace Listing</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to approve <strong>{modal.title}</strong>? It will immediately become live and visible to all customers on the marketplace.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModal({ type: "detail", listingId: modal.listingId, title: modal.title })}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={() => handleApprove(modal.listingId!)}
                disabled={actionLoading}
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
              >
                {actionLoading ? "Approving..." : "Confirm Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action: Reject Modal */}
      {modal.type === "reject" && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">Reject Submission</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Please enter the reason for rejecting <strong>{modal.title}</strong>. This feedback will be sent to the agent.
            </p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., Image quality is too low or structural details are incomplete."
              className="w-full h-32 border border-gray-200 rounded-xl p-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none mb-5 transition-colors resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setInputText("");
                  setModal({ type: "detail", listingId: modal.listingId, title: modal.title });
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={() => handleReject(modal.listingId!)}
                disabled={actionLoading}
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50"
              >
                {actionLoading ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action: Request Change Modal */}
      {modal.type === "request_change" && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">Request Revision / Change</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Enter specific revision notes for <strong>{modal.title}</strong>. The agent will be notified to modify their submission.
            </p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., Please upload clearer floor plan images and add more details to description."
              className="w-full h-32 border border-gray-200 rounded-xl p-3 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none mb-5 transition-colors resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setInputText("");
                  setModal({ type: "detail", listingId: modal.listingId, title: modal.title });
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={() => handleRequestChange(modal.listingId!)}
                disabled={actionLoading}
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-50"
              >
                {actionLoading ? "Sending request..." : "Request Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

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
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-600 font-medium">
                  No marketplace listings found.
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => (
                <tr
                  key={s.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    {s.avatar ? (
                      <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                        <img
                          src={s.avatar}
                          alt={s.agent}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-bold text-sm shadow-sm flex-shrink-0">
                        {s.agent?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
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

                  <td className="px-4 py-4 whitespace-nowrap text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === s.id ? null : s.id)
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenuId === s.id && (
                      <div className="absolute right-4 top-full mt-1 z-50 w-48 rounded-2xl border border-gray-200 bg-white py-2 shadow-2xl text-left">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(s.id, s.title)}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 font-medium"
                        >
                          <Eye size={14} className="text-gray-400" />
                          View Detail
                        </button>
                        {s.status === "Pending Approval" && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setModal({ type: "approve", listingId: s.id, title: s.title });
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-emerald-600 transition hover:bg-emerald-50 font-semibold"
                            >
                              <Check size={14} />
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setModal({ type: "request_change", listingId: s.id, title: s.title });
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-amber-600 transition hover:bg-amber-50 font-semibold"
                            >
                              <RefreshCw size={14} />
                              Request Revision
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setModal({ type: "reject", listingId: s.id, title: s.title });
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50 font-semibold"
                            >
                              <X size={14} />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}