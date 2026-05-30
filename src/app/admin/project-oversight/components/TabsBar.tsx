"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface TabsBarProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

const tabs = ["Customers", "Agents", "Custom Projects"];

export default function TabsBar({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  status,
  setStatus,
}: TabsBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [purchaseType, setPurchaseType] = useState("All Types");
  const [planType, setPlanType] = useState("All Category");
  const [projectStatus, setProjectStatus] = useState("All Status");

  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      
      {/* ─── Tabs (LEFT) ─── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-[#FFC700] text-[#1a1a2e]"
                : "bg-white text-gray-500 shadow-sm hover:text-[#1a1a2e]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Right Section (SEARCH + FILTER) ─── */}
      <div className="flex flex-1 sm:flex-row gap-3 w-full lg:w-auto lg:ml-auto lg:items-center">

        {/* Search */}
        <div className="relative w-full sm:w-[260px] lg:w-[300px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by id"
            className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-[#1a1a2e] outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/30"
          />
        </div>

        {/* Filter */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1a1a2e] shadow-sm hover:bg-gray-100 transition"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 left-0 sm:left-auto mt-3 w-full sm:w-[300px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xl z-50">

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-[#1a1a2e]">Filters</p>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-4">

                {/* Purchase */}
                <div>
                  <label className="block mb-1 text-[10px] uppercase tracking-wider text-gray-400">
                    Purchase Type
                  </label>
                  <select
                    value={purchaseType}
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#FFC700]"
                  >
                    <option>All Types</option>
                    <option>Standard Plan</option>
                    <option>Custom Request</option>
                  </select>
                </div>

                {/* Plan */}
                <div>
                  <label className="block mb-1 text-[10px] uppercase tracking-wider text-gray-400">
                    Plan Type
                  </label>
                  <select
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#FFC700]"
                  >
                    <option>All Category</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Hotel & Lodge</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block mb-1 text-[10px] uppercase tracking-wider text-gray-400">
                    Project Status
                  </label>
                  <select
                    value={projectStatus}
                    onChange={(e) => {
                      setProjectStatus(e.target.value);
                      setStatus(e.target.value === "All Status" ? "All" : e.target.value);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#FFC700]"
                  >
                    <option>All Status</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Disputed</option>
                    <option>Cancelled</option>
                    <option>Pending Approval</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setPurchaseType("All Types");
                      setPlanType("All Category");
                      setProjectStatus("All Status");
                      setStatus("All");
                    }}
                    className="text-sm font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="rounded-full bg-[#FFC700] px-5 py-2.5 text-sm font-semibold text-[#1a1a2e] hover:bg-yellow-400 transition"
                  >
                    Apply
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

