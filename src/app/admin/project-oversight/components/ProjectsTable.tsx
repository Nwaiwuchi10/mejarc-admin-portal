"use client";

import { useState } from "react";
import { MoreHorizontal, User } from "lucide-react";

type Project = {
  id: number;
  projectId: string;
  customerName: string;
  planType: string;
  purchaseType: string;
  budget: string;
  status: "Ongoing" | "Disputed" | "Cancelled";
  startDate: string;
  deadline: string;
  agentAssigned: string;
  avatar: string;
};

interface ProjectsTableProps {
  activeTab: string;
  search: string;
  status: string;
  data?: any[];
}

const statusStyles = {
  Ongoing: "bg-amber-100 text-amber-700",
  Disputed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-800 text-white",
  "Pending Approval": "bg-yellow-100 text-yellow-700",
};

export default function ProjectsTable({
  activeTab,
  search,
  status,
  data: propData
}: ProjectsTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<number | string | null>(null);

  const toggleDropdown = (id: number | string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const displayData = propData && propData.length > 0 ? propData : [];

  if (activeTab === "Agents") {
    const currentAgents = displayData.map((a, i) => ({
      id: a.id || i,
      name: a.firstName ? `${a.firstName} ${a.lastName}` : a.name || "N/A",
      avatar: a.profilePicture || "https://i.pravatar.cc/100",
      handled: a.projectsHandled || 0,
      completed: a.projectsCompleted || 0,
      ongoing: a.projectsOngoing || 0,
      cancelled: a.projectsCancelled || 0,
      disputed: a.projectsDisputed || 0,
      earnings: `₦${a.earnings?.toLocaleString() || "0"}`,
      rating: `${a.avgRating || "0"}/5`
    }));

    const filteredAgents = currentAgents.filter((agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
        <table className="w-full text-left text-sm xl:min-w-[900px]">
          <thead className="bg-[#1a1a2e] text-white">
            <tr>
              <th className="px-6 py-4 font-medium">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Agent Name
                </div>
              </th>
              {["Projects Handled", "Completed", "Ongoing", "Cancelled", "Disputed", "Earnings", "Avg Rating", "Action"].map((header) => (
                <th key={header} className="px-6 py-4 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAgents.length === 0 ? (
              <tr><td colSpan={9} className="px-6 py-10 text-center text-gray-600">No agents found</td></tr>
            ) : (
              filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={agent.avatar} className="h-11 w-11 rounded-full object-cover shadow-sm border border-gray-100" />
                      <span className="font-semibold text-[#1a1a2e]">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{agent.handled}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{agent.completed}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{agent.ongoing}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{agent.cancelled}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{agent.disputed}</td>
                  <td className="px-6 py-4 text-[#1a1a2e] font-bold">{agent.earnings}</td>
                  <td className="px-6 py-4 text-amber-600 font-bold">{agent.rating}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleDropdown(agent.id)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  if (activeTab === "Custom Projects") {
    const currentCustomProjects = displayData.map((p, i) => ({
      id: p.id || i,
      submissionId: p.submissionId || p.id,
      agentName: p.agent?.name || p.agentName || "N/A",
      projectTitle: p.title || p.projectTitle || "N/A",
      customer: p.customer?.name || p.customerName || "N/A",
      planType: p.planType || "Custom",
      projectValue: `₦${p.value?.toLocaleString() || "0"}`,
      submissionDate: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A",
      status: p.status || "Pending Approval",
      avatar: p.agent?.profilePicture || "https://i.pravatar.cc/100"
    }));

    const filteredProjects = currentCustomProjects.filter((p) => {
      const matchSearch = p.projectTitle.toLowerCase().includes(search.toLowerCase()) || p.customer.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "All" || p.status === status;
      return matchSearch && matchStatus;
    });

    return (
      <div className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
        <table className="w-full text-left text-sm xl:min-w-[900px]">
          <thead className="bg-[#1a1a2e] text-white">
            <tr>
              {["No.", "Agent Name", "Project Title", "Customer", "Plan Type", "Value", "Date", "Status", "Action"].map(h => <th key={h} className="px-6 py-4 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProjects.length === 0 ? (
              <tr><td colSpan={9} className="px-6 py-10 text-center text-gray-600">No custom projects found</td></tr>
            ) : (
              filteredProjects.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1a1a2e]">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <img src={p.avatar} className="h-8 w-8 rounded-full object-cover" />
                        <span className="font-semibold text-[#1a1a2e]">{p.agentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{p.projectTitle}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{p.customer}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{p.planType}</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">{p.projectValue}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{p.submissionDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${p.status === "Pending Approval" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleDropdown(p.id)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  const currentGeneralProjects = displayData.map((p, i) => ({
    id: p.id || i,
    projectId: p.projectId || p.id,
    customerName: p.customer?.name || p.customerName || "N/A",
    planType: p.planType || "Standard",
    purchaseType: p.purchaseType || "Direct",
    budget: `₦${p.budget?.toLocaleString() || "0"}`,
    status: (p.status || "Ongoing") as Project["status"],
    startDate: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A",
    deadline: p.deadline || "-",
    agentAssigned: p.agent?.name || p.agentName || "-",
    avatar: p.customer?.avatar || "https://i.pravatar.cc/100"
  }));

  const filtered = currentGeneralProjects.filter((p) => {
    const matchSearch = p.customerName.toLowerCase().includes(search.toLowerCase()) || p.projectId.toString().includes(search);
    const matchStatus = status === "All" || p.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
      <table className="w-full text-left text-sm xl:min-w-[900px]">
        <thead className="bg-[#1a1a2e] text-white">
          <tr>
            <th className="px-6 py-4">
              <div className="flex justify-center"><User size={16} /></div>
            </th>
            {["No.", "Customer Name", "Plan Type", "Purchase Type", "Budget", "Status", "Start Date", "Deadline", "Agent Assigned", "Action"].map(h => <th key={h} className="px-6 py-4 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <tr><td colSpan={11} className="px-6 py-10 text-center text-gray-600">No projects found</td></tr>
          ) : (
            filtered.map((p, i) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4"><img src={p.avatar} className="h-10 w-10 rounded-full object-cover shadow-sm" /></td>
                <td className="px-6 py-4 font-bold text-[#1a1a2e]">{i + 1}</td>
                <td className="px-6 py-4 font-semibold text-[#1a1a2e]">{p.customerName}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{p.planType}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{p.purchaseType}</td>
                <td className="px-6 py-4 text-blue-600 font-bold">{p.budget}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusStyles[p.status] || "bg-gray-100 text-gray-700"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{p.startDate}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{p.deadline}</td>
                <td className="px-6 py-4 text-gray-700 font-semibold">{p.agentAssigned}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toggleDropdown(p.id)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}