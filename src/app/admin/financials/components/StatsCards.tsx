export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      
      {/* Total Revenue */}
      <div className="overflow-hidden rounded-2xl shadow-sm">
        <div className="bg-[#FFC700] p-5">
          <p className="text-sm font-medium text-[#1a1a2e]">
            Total Revenue
          </p>

          <h2 className="mt-2 text-2xl font-bold text-black lg:text-3xl">
            ₦11,210,500
          </h2>
        </div>

        <div className="bg-[#1a1a2e] px-5 py-3 text-sm text-green-400">
          This week <span className="font-semibold">+14.02%</span>
        </div>
      </div>

      {/* Pending */}
      <div className="rounded-2xl border-l-4 border-blue-500 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Pending Payouts
        </p>

        <h2 className="mt-3 text-2xl font-bold text-[#1a1a2e]">
          ₦8,200,000
        </h2>
      </div>

      {/* Completed */}
      <div className="rounded-2xl border-l-4 border-green-500 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Completed Payouts
        </p>

        <h2 className="mt-3 text-2xl font-bold text-[#1a1a2e]">
          ₦1,385,700
        </h2>
      </div>

      {/* Refunds */}
      <div className="rounded-2xl border-l-4 border-red-500 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Refunds Issued
        </p>

        <h2 className="mt-3 text-2xl font-bold text-[#1a1a2e]">
          ₦85,700
        </h2>
      </div>
    </div>
  );
}