"use client";

import { useState } from "react";

export default function Performance() {
  const [showFilter, setShowFilter] = useState(false);

  const stats = [
    {
      label: "Completed",
      value: 178,
      color: "text-purple-600",
    },
    {
      label: "In Progress",
      value: 92,
      color: "text-green-600",
    },
    {
      label: "Disputed",
      value: 2,
      color: "text-yellow-600",
    },
    {
      label: "Cancelled",
      value: 7,
      color: "text-red-500",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm space-y-4 relative overflow-hidden">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between gap-3">

        <div>
          <h3 className="text-base font-semibold text-[#1a1a2e]">
            Project Performance
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Overview of delivery metrics
          </p>
        </div>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="
            rounded-lg
            bg-gray-100
            px-3
            py-2
            text-xs
            font-medium
            text-[#1a1a2e]
            transition
            hover:bg-gray-200
          "
        >
          This Month
        </button>

      </div>

      {/* FILTER POPUP */}
      {showFilter && (
        <div
          className="
            absolute
            right-0
            top-14
            z-50
            w-[280px]
            max-w-[90vw]
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-4
            shadow-xl
          "
        >

          {/* DATE LABELS */}
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Start Date</span>
            <span>End Date</span>
          </div>

          {/* INPUTS */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="25.09.2025"
              className="
                w-1/2
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2
                text-sm
                outline-none
                focus:border-yellow-400
              "
            />

            <input
              type="text"
              placeholder="15.11.2025"
              className="
                w-1/2
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2
                text-sm
                outline-none
                focus:border-yellow-400
              "
            />
          </div>

          {/* QUICK FILTERS */}
          <div className="space-y-2">
            {["Today", "Yesterday", "This Month", "Last Month"].map(
              (item) => (
                <button
                  key={item}
                  className={`
                    w-full
                    rounded-lg
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                      item === "This Month"
                        ? "bg-[#1a1a2e] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}
          </div>

        </div>
      )}

      {/* CIRCLES */}
      <div className="flex flex-wrap items-end justify-center gap-5">

        <div className="
          flex h-32 w-32 items-center justify-center
          rounded-full
          bg-purple-100
          text-3xl
          font-bold
          text-purple-600
        ">
          64%
        </div>

        <div className="
          flex h-24 w-24 items-center justify-center
          rounded-full
          bg-green-100
          text-xl
          font-bold
          text-green-600
        ">
          53%
        </div>

        <div className="
          flex h-20 w-20 items-center justify-center
          rounded-full
          bg-red-100
          text-lg
          font-bold
          text-red-500
        ">
          40%
        </div>

        <div className="
          flex h-16 w-16 items-center justify-center
          rounded-full
          bg-yellow-100
          text-sm
          font-bold
          text-yellow-600
        ">
          8%
        </div>

      </div>

      {/* STATS */}
      <div className="
        mt-8
        grid
        grid-cols-2
        gap-4
        border-t
        border-gray-100
        pt-5
      ">
        {stats.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`text-sm ${item.color}`}>
              ●
            </span>

            <span className="text-sm text-gray-500">
              {item.label}
            </span>

            <span className="ml-auto text-sm font-semibold text-[#1a1a2e]">
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}