"use client";

import { useState } from "react";

interface RevenueChartProps {
  data?: any[];
}

export default function RevenueChart({ data: propData }: RevenueChartProps) {
  const chartData = propData && propData.length > 0 ? propData : [];
  
  if (chartData.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm xl:col-span-2 relative overflow-hidden flex flex-col justify-center items-center py-20">
        <p className="text-gray-400 font-semibold text-sm">No revenue data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map(item => item.revenue || item.value || 0), 1000);
  const intervals = Array.from({ length: 6 }, (_, i) => Math.round(maxValue - (maxValue / 5) * i));

  const [showFilter, setShowFilter] = useState(false);

  const currentMonthLabel = new Date().toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm xl:col-span-2 relative overflow-hidden">

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between gap-3">

        <div>
          <h3 className="text-base font-semibold text-[#1a1a2e]">
            Revenue Analytics
          </h3>

          <p className="mt-1 text-xs text-gray-600">
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

          <div className="mb-2 flex justify-between text-xs text-gray-600">
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
            text-gray-600
            w-16
            text-right
            pr-2
          ">
            {intervals.map((val, idx) => (
              <span key={idx}>
                ₦{val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val}
              </span>
            ))}
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
            {chartData.map((item: any) => {
              const chartHeight = 220;
              const val = item.revenue || item.value || 0;
              const heightPx =
                (val / maxValue) * chartHeight;

              const finalHeight = Math.max(heightPx, 8);

              const isActive = item.month?.toUpperCase() === currentMonthLabel;

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
                    text-gray-600
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