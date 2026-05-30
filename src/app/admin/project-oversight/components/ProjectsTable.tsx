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

type AgentRow = {
  id: number;
  name: string;
  avatar: string;
  handled: number;
  completed: number;
  ongoing: number;
  cancelled: number;
  disputed: number;
  earnings: string;
  rating: string;
};

type CustomProjectRow = {
  id: number;
  submissionId: string;
  agentName: string;
  projectTitle: string;
  customer: string;
  planType: string;
  projectValue: string;
  submissionDate: string;
  status: string;
  avatar: string;
};

interface ProjectsTableProps {
  activeTab: string;
  search: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 1,
    projectId: "PRJ-001",
    customerName: "John Smith",
    planType: "Residential Plan",
    purchaseType: "Bought Standard Plan",
    budget: "₦30,000,000",
    status: "Ongoing",
    startDate: "Feb 1, 2026",
    deadline: "-",
    agentAssigned: "-",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: 2,
    projectId: "PRJ-002",
    customerName: "Aisha Bello",
    planType: "Custom Villa",
    purchaseType: "Custom Request",
    budget: "₦20,000,000",
    status: "Disputed",
    startDate: "Jan 15, 2026",
    deadline: "Feb 15, 2026",
    agentAssigned: "David Okoro",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    id: 3,
    projectId: "PRJ-003",
    customerName: "Carlos Ramirez",
    planType: "Renovation Plan",
    purchaseType: "Custom Request",
    budget: "₦60,000,000",
    status: "Cancelled",
    startDate: "Jan 20, 2026",
    deadline: "Feb 10, 2026",
    agentAssigned: "Mei Chen",
    avatar: "/avatars/avatar-3.jpg",
  },
];

const agentRows: AgentRow[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/avatars/avatar-1.jpg",
    handled: 5,
    completed: 7,
    ongoing: 3,
    cancelled: 10,
    disputed: 0,
    earnings: "₦20,000,000",
    rating: "4.6/5",
  },
  {
    id: 2,
    name: "David Okoro",
    avatar: "/avatars/avatar-2.jpg",
    handled: 2,
    completed: 1,
    ongoing: 1,
    cancelled: 10,
    disputed: 0,
    earnings: "₦20,000,000",
    rating: "4.6/5",
  },
  {
    id: 3,
    name: "Mei Chen",
    avatar: "/avatars/avatar-3.jpg",
    handled: 8,
    completed: 12,
    ongoing: 5,
    cancelled: 1,
    disputed: 0,
    earnings: "₦20,000,000",
    rating: "4.6/5",
  },
];

const customProjectRows: CustomProjectRow[] = [
  {
    id: 1,
    submissionId: "SUB-001",
    agentName: "Sarah Johnson",
    projectTitle: "Eco Home Design",
    customer: "John Smith",
    planType: "Custom Villa",
    projectValue: "$2,200",
    submissionDate: "Mar 1, 2026",
    status: "Pending Approval",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: 2,
    submissionId: "SUB-002",
    agentName: "David Okoro",
    projectTitle: "Luxury Villa Layout",
    customer: "Aisha Bello",
    planType: "Custom Villa",
    projectValue: "$3,000",
    submissionDate: "Mar 1, 2026",
    status: "Pending Approval",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    id: 3,
    submissionId: "SUB-003",
    agentName: "Mei Chen",
    projectTitle: "Modern Office Space",
    customer: "Ahmed Musa",
    planType: "Custom Villa",
    projectValue: "$4,500",
    submissionDate: "Mar 1, 2026",
    status: "Pending Approval",
    avatar: "/avatars/avatar-3.jpg",
  },
];

const statusStyles = {
  Ongoing: "bg-amber-100 text-amber-700",
  Disputed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-800 text-white",
};

export default function ProjectsTable({
  activeTab,
  search,
  status,
}: ProjectsTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  if (activeTab === "Agents") {
    const filteredAgents = agentRows.filter((agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
        {/* <table className="w-full min-w-[900px] text-left text-sm"> */}
        <table className="w-full text-left text-sm xl:min-w-[900px]">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 font-medium">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    Agent Name
                  </span>
                  <span className="text-xs cursor-pointer">↕</span>
                </div>
              </th>
              {[
                "Projects Handled",
                "Completed",
                "Ongoing",
                "Cancelled",
                "Disputed",
                "Earnings",
                "Avg Rating",
                "Action",
              ].map((header) => (
                <th key={header} className="px-6 py-4 font-medium">
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                    <span className="text-xs cursor-pointer">↕</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredAgents.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No agents found
                </td>
              </tr>
            ) : (
              filteredAgents.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-[#1a1a2e]">
                        {agent.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.handled}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.completed}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.ongoing}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.cancelled}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.disputed}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.earnings}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{agent.rating}</td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => toggleDropdown(agent.id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openDropdownId === agent.id && (
                      <div className="absolute right-0 top-full z-10 mt-2 w-40 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                        <button
                          onClick={() => setOpenDropdownId(null)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setOpenDropdownId(null)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </div>
                    )}
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
    const filteredProjects = customProjectRows.filter((project) => {
      const matchesSearch =
        project.submissionId.toLowerCase().includes(search.toLowerCase()) ||
        project.agentName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || project.status === status;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
        <table className="w-full text-left text-sm xl:min-w-[900px]">
          <thead className="bg-gray-900 text-white">
            <tr>
              {[
                "Submission ID",
                "Agent Name",
                "Project Title",
                "Customer",
                "Plan Type",
                "Project Value",
                "Submission Date",
                "Status",
                "Action",
              ].map((header) => (
                <th key={header} className="px-6 py-4 font-medium">
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                    <span className="text-xs cursor-pointer">↕</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No custom projects found
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[#1a1a2e] font-medium">
                    {project.submissionId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                        <img
                          src={project.avatar}
                          alt={project.agentName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-[#1a1a2e]">
                        {project.agentName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#1a1a2e]">
                    {project.projectTitle}
                  </td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{project.customer}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">{project.planType}</td>
                  <td className="px-6 py-4 text-[#1a1a2e]">
                    {project.projectValue}
                  </td>
                  <td className="px-6 py-4 text-[#1a1a2e]">
                    {project.submissionDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => toggleDropdown(project.id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openDropdownId === project.id && (
                      <div className="absolute right-0 top-full z-10 mt-2 w-40 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                        <button
                          onClick={() => setOpenDropdownId(null)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setOpenDropdownId(null)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  const filtered = projects.filter((project) => {
    const matchesTab = activeTab === "Customers" || activeTab === project.agentAssigned;
    const matchesSearch =
      project.projectId.toLowerCase().includes(search.toLowerCase()) ||
      project.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || project.status === status;
    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    // <div className="overflow-x-auto rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
    <div className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm">
      {/* <table className="w-full min-w-[900px] text-left text-sm"> */}
      <table className="w-full text-left text-sm xl:min-w-[900px]">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-6 py-4 font-medium">
              <div className="flex items-center justify-center">
                <User size={16} />
              </div>
            </th>
            {[
              "Project ID",
              "Customer Name",
              "Plan Type",
              "Purchase Type",
              "Budget",
              "Status",
              "Start Date",
              "Deadline",
              "Agent Assigned",
              "Action",
            ].map((header) => (
              <th key={header} className="px-6 py-4 font-medium">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">{header}</span>
                  <span className="text-xs cursor-pointer">↕</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                No projects found
              </td>
            </tr>
          ) : (
            filtered.map((project) => (
              <tr
                key={project.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src={project.avatar}
                      alt={project.customerName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-[#1a1a2e] font-medium">
                  {project.projectId}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#1a1a2e]">
                    {project.customerName}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#1a1a2e]">{project.planType}</td>
                <td className="px-6 py-4 text-[#1a1a2e]">
                  {project.purchaseType}
                </td>
                <td className="px-6 py-4 text-[#1a1a2e]">{project.budget}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#1a1a2e]">{project.startDate}</td>
                <td className="px-6 py-4 text-[#1a1a2e]">{project.deadline}</td>
                <td className="px-6 py-4 text-[#1a1a2e]">
                  {project.agentAssigned}
                </td>
                <td className="px-6 py-4 relative">
                  <button
                    onClick={() => toggleDropdown(project.id)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openDropdownId === project.id && (
                    <div className="absolute right-0 top-full z-10 mt-2 w-40 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                      <button
                        onClick={() => setOpenDropdownId(null)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setOpenDropdownId(null)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}