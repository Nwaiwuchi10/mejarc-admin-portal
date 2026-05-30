export default function StatsCards() {
  const cards = [
    { title: "Total Revenue", value: "₦11,210,500" },
    { title: "Customer Payments", value: "₦8,200,000" },
    { title: "Agent Payouts", value: "₦1,385,700" },
    { title: "Platform Commission", value: "₦85,700" },
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
            <p className="text-sm font-medium text-gray-500">
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

              <span className="text-xs text-gray-400">
                vs last week
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}