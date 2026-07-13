"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Calendar, User, Mail, Phone, FileText, Eye, X } from "lucide-react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { contactService } from "@/src/services/contactService";

export default function ContactInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await contactService.getInquiries();
    if (Array.isArray(res)) {
      setInquiries(res);
    } else if (res && res.data) {
      setInquiries(res.data);
    }
    setLoading(false);
  };

  const filtered = inquiries.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term)
    );
  });

  return (
    <AdminLayout>
      <div className="w-full max-w-full text-[#4a4a4a] overflow-x-hidden p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Contact Inquiries</h1>
            <p className="text-xs text-gray-500 mt-1">View messages and requests from visitors.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition shadow-sm text-sm"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-12 h-12 text-[#FFC700] animate-spin" />
              <span className="text-gray-500 font-medium text-sm">Fetching messages...</span>
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-gray-500">
                <thead className="bg-[#fcfcfa] text-xs font-semibold uppercase text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Name</th>
                    <th className="px-6 py-4 font-bold">Email</th>
                    <th className="px-6 py-4 font-bold">Phone</th>
                    <th className="px-6 py-4 font-bold">Message Preview</th>
                    <th className="px-6 py-4 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(item)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {item.phone}
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-gray-500">
                        {item.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFC700]/10 hover:bg-[#FFC700]/20 text-[#1a1a2e] font-semibold text-xs rounded-lg transition"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 italic text-gray-500">
              No inquiries found matching search.
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#1a1a2e] text-white rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold">Inquiry Details</h3>
                <p className="text-gray-300 text-xs mt-1">Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg text-[#1a1a2e]">
                  <User size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Name</span>
                  <span className="text-sm font-bold text-[#1a1a2e]">{selectedInquiry.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg text-[#1a1a2e]">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Email Address</span>
                  <span className="text-sm font-medium text-[#1a1a2e]">{selectedInquiry.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg text-[#1a1a2e]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Phone Number</span>
                  <span className="text-sm font-medium text-[#1a1a2e]">{selectedInquiry.phone}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <span className="text-[10px] text-gray-400 block font-bold uppercase">Message</span>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
