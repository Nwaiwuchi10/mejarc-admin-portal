"use client";

import StaffRow from "./StaffRow";

const staffData = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    dept: "Operations",
    email: "sarah@mejarc.com",
    status: "Active",
    lastLogin: "2 hrs ago",
  },
  {
    name: "David Williams",
    role: "Finance Manager",
    dept: "Finance",
    email: "david@mejarc.com",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    name: "Michael Lee",
    role: "Support Manager",
    dept: "Customer Support",
    email: "michael@mejarc.com",
    status: "Active",
    lastLogin: "30 mins ago",
  },
];

export default function StaffAssignment() {
  return (
    <div className="space-y-5">

      {/* Top Action */}
      <div className="flex justify-end">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg text-sm font-semibold transition">
          Assign Staff Role
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-7 bg-gray-900 text-white text-sm px-5 py-3">
          <p>Staff Name</p>
          <p>Role</p>
          <p>Department</p>
          <p>Email</p>
          <p>Status</p>
          <p>Last Login</p>
          <p className="text-right">Action</p>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {staffData.map((staff, index) => (
            <StaffRow key={index} staff={staff} />
          ))}
        </div>
      </div>

    </div>
  );
}