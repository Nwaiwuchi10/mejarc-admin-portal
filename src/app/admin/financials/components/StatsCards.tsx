interface StatsCardsProps {
  stats?: any;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      
      {/* Total Revenue */}
      <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100">
        <div className="bg-[#FFC700] p-5">
          <p className="text-sm font-bold text-[#1a1a2e]">
            Total Revenue
          </p>

          <h2 className="mt-2 text-2xl font-black text-black lg:text-3xl">
            ₦{stats?.totalRevenue?.toLocaleString() || "0"}
          </h2>
        </div>

        <div className="bg-[#1a1a2e] px-5 py-3 text-sm text-green-400 font-bold">
          All-time <span className="text-gray-300 font-normal">earnings</span>
        </div>
      </div>

      {/* Pending */}
      <div className="rounded-2xl border-l-[6px] border-blue-500 bg-white p-5 shadow-sm border border-gray-100">
        <p className="text-sm font-bold text-gray-600">
          Pending Payouts
        </p>

        <h2 className="mt-3 text-2xl font-black text-[#1a1a2e]">
          ₦{stats?.pendingPayouts?.toLocaleString() || "0"}
        </h2>
      </div>

      {/* Completed */}
      <div className="rounded-2xl border-l-[6px] border-green-500 bg-white p-5 shadow-sm border border-gray-100">
        <p className="text-sm font-bold text-gray-600">
          Completed Payouts
        </p>

        <h2 className="mt-3 text-2xl font-black text-[#1a1a2e]">
          ₦{stats?.completedPayouts?.toLocaleString() || "0"}
        </h2>
      </div>

      {/* Refunds */}
      <div className="rounded-2xl border-l-[6px] border-red-500 bg-white p-5 shadow-sm border border-gray-100">
        <p className="text-sm font-bold text-gray-600">
          Refund Issues
        </p>

        <h2 className="mt-3 text-2xl font-black text-[#1a1a2e]">
          ₦{stats?.refundsIssued?.toLocaleString() || "0"}
        </h2>
      </div>
    </div>
  );
}