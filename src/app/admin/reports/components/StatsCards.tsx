interface StatsCardsProps {
  summary?: any;
}

export default function StatsCards({ summary }: StatsCardsProps) {
  const cards = [
    { title: "Total Revenue", value: summary ? `₦${summary.totalRevenue?.toLocaleString()}` : "₦0" },
    { title: "Customer Payments", value: summary ? `₦${summary.customerPayments?.toLocaleString()}` : "₦0" },
    { title: "Agent Payouts", value: summary ? `₦${summary.agentPayouts?.toLocaleString()}` : "₦0" },
    { title: "Platform Commission", value: summary ? `₦${summary.platformCommission?.toLocaleString()}` : "₦0" },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

        {cards.map((card, index) => (
          <div
            key={index}
            className="
              min-w-0
              rounded-2xl
              border border-[#e8eaf0]
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-200
              hover:shadow-md
            "
          >
            <p className="text-sm font-medium text-gray-600">
              {card.title}
            </p>

            <h2 className="
              mt-3
              truncate
              text-2xl
              font-bold
              tracking-tight
              text-[#1a1a2e]
            ">
              {card.value}
            </h2>

            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                +25.2%
              </span>

              <span className="text-xs text-gray-600">
                vs last week
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}