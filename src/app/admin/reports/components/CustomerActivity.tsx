import {  useState } from "react";

interface CustomerActivityProps {
  activity?: any[];
}

export default function CustomerActivity({ activity }: CustomerActivityProps) {
  const [showFilter, setShowFilter] = useState(false);

  const items = [
    { title: "Total Active Customers", value: "4598" },
    { title: "New Customers", value: activity?.length.toString() || "91" },
    { title: "Returning Customers", value: "12" },
    { title: "Projects Created", value: "76" },
  ];

  return (
    <div className="w-full overflow-hidden bg-white text-[#4a4a4a] p-4 md:p-5 rounded-xl shadow-sm relative">
      
      <div className="flex justify-between">
        <h3 className="font-semibold">Customer Activity</h3>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="text-xs text-[#1a1a2e] bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
        >
          This Month
        </button>
      </div>

      {showFilter && (
        <div className="absolute right-0 md:right-5 top-12 w-[90vw] max-w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 space-y-3 z-50">
          
          {/* Dates */}
          <div className="flex justify-between text-xs text-gray-600">
            <span>Start Date</span>
            <span>End Date</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="25.09.2025"
              className="w-full px-2 py-2 bg-gray-100 rounded text-sm outline-none"
            />
            <input
              type="text"
              placeholder="15.11.2025"
              className="w-full px-2 py-2 bg-gray-100 rounded text-sm outline-none"
            />
          </div>

          {/* Quick Filters */}
          {["Today", "Yesterday", "This Month", "Last Month"].map((item) => (
            <button
              key={item}
              className={`w-full py-2 rounded-md text-sm transition
                ${
                  item === "This Month"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-4">
        {items.map((item, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">{item.title}</p>
            <h2 className="text-xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}