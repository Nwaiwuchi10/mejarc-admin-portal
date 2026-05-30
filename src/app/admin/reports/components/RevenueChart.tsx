"use client";

import { useState } from "react";

export default function RevenueChart() {
  const data = [
    { month: "JAN", value: 3 },
    { month: "FEB", value: 15 },
    { month: "MAR", value: 35 },
    { month: "APR", value: 0.5 },
    { month: "MAY", value: 0.5 },
  ];

  const maxValue = 35;

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm xl:col-span-2 relative overflow-hidden">

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between gap-3">

        <div>
          <h3 className="text-base font-semibold text-[#1a1a2e]">
            Revenue Analytics
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Revenue trends across recent months
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

      {/* FILTER */}
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

          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Start Date</span>
            <span>End Date</span>
          </div>

          <div className="mb-4 flex gap-2">
            <input
              type="date"
              className="
                w-1/2
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                p-2
                text-sm
                outline-none
              "
            />

            <input
              type="date"
              className="
                w-1/2
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                p-2
                text-sm
                outline-none
              "
            />
          </div>

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

      {/* CHART */}
      <div className="w-full overflow-x-auto">

        <div className="flex min-w-[500px] gap-6">

          {/* Y AXIS */}
          <div className="
            flex
            h-72
            flex-col
            justify-between
            pb-8
            text-xs
            font-medium
            text-gray-400
          ">
            <span>35M</span>
            <span>25M</span>
            <span>15M</span>
            <span>10M</span>
            <span>5M</span>
            <span>1M</span>
            <span>500K</span>
            <span>0</span>
          </div>

          {/* BARS */}
          <div className="
            flex
            h-72
            flex-1
            items-end
            justify-between
            gap-4
            border-b
            border-l
            border-gray-100
            px-4
            pb-8
          ">
            {data.map((item) => {
              const chartHeight = 220;
              const heightPx =
                (item.value / maxValue) * chartHeight;

              const finalHeight = Math.max(heightPx, 8);

              const isActive = item.month === "MAR";

              return (
                <div
                  key={item.month}
                  className="
                    flex
                    flex-1
                    flex-col
                    items-center
                    justify-end
                    gap-3
                  "
                >

                  <div
                    className={`
                      w-full
                      max-w-[48px]
                      rounded-t-xl
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-yellow-400"
                          : "bg-gray-200"
                      }
                    `}
                    style={{
                      height: `${finalHeight}px`,
                    }}
                  />

                  <span className="
                    text-xs
                    font-medium
                    text-gray-500
                  ">
                    {item.month}
                  </span>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}