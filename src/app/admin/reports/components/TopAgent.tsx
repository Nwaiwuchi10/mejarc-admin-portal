"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, ChevronLeft, ChevronRight, Star, Briefcase, Wallet, CheckCircle } from "lucide-react";

interface TopAgentProps {
  agents?: any[];
}

export default function TopAgent({ agents: propAgents }: TopAgentProps) {
  const agents = Array.isArray(propAgents) ? propAgents : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (agents.length === 0) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 overflow-hidden h-full flex flex-col justify-center items-center py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-2">
          <Award size={22} />
        </div>
        <p className="text-gray-600 font-semibold text-sm m-0">No agent performance data yet</p>
        <p className="text-gray-400 text-xs m-0 mt-1">Verified agents and their earnings will appear here</p>
      </div>
    );
  }

  const currentAgent = agents[currentIndex] || agents[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % agents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 overflow-hidden h-full flex flex-col justify-between">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFF8E7] flex items-center justify-center text-[#FFC700]">
            <Award size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1a1a2e] m-0">Top Performing Agent</h3>
            <p className="text-[11px] text-gray-500 m-0">
              Rank #{currentIndex + 1} of {agents.length}
            </p>
          </div>
        </div>

        {/* Carousel controls if more than 1 agent */}
        {agents.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors border-0 cursor-pointer"
              title="Previous Agent"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors border-0 cursor-pointer"
              title="Next Agent"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* AGENT PROFILE CARD */}
      <div className="flex flex-col items-center text-center py-2">
        {currentAgent.avatar ? (
          <img
            src={currentAgent.avatar}
            alt={currentAgent.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#FFC700] shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-black text-xl shadow-sm">
            {currentAgent.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        )}
        <h4 className="mt-2.5 font-bold text-[#1a1a2e] text-base m-0">{currentAgent.name}</h4>
        {currentAgent.email && (
          <p className="text-xs text-gray-500 m-0 mt-0.5">{currentAgent.email}</p>
        )}
      </div>

      {/* METRICS TILES */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-2">
          <Briefcase size={15} className="text-blue-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 m-0 leading-none">Projects</p>
            <p className="font-bold text-[#1a1a2e] m-0 mt-0.5">{currentAgent.projectsCompleted} approved</p>
          </div>
        </div>

        <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-2">
          <Wallet size={15} className="text-emerald-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 m-0 leading-none">Earnings</p>
            <p className="font-bold text-[#1a1a2e] m-0 mt-0.5 truncate">
              ₦{Number(currentAgent.earnings || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-2">
          <Star size={15} className="text-yellow-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 m-0 leading-none">Rating</p>
            <p className="font-bold text-[#1a1a2e] m-0 mt-0.5">{currentAgent.rating || "5.0"} / 5.0</p>
          </div>
        </div>

        <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-2">
          <CheckCircle size={15} className="text-purple-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 m-0 leading-none">Completion</p>
            <p className="font-bold text-[#1a1a2e] m-0 mt-0.5">{currentAgent.completionRate || "100%"}</p>
          </div>
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="pt-2 border-t border-gray-50 text-center">
        <Link
          href="/admin/users?tab=Agents"
          className="text-xs font-semibold text-amber-600 hover:text-amber-700 no-underline"
        >
          View All Verified Agents &rarr;
        </Link>
      </div>
    </div>
  );
}