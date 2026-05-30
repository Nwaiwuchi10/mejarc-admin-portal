export default function Stats() {
  const cards = [
    {
      title: "Total Messages Sent",
      value: "12,450",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Active Conversations",
      value: "324",
      color: "bg-green-100 text-green-600",
      action: "View",
    },
    {
      title: "Unread Messages",
      value: "42",
      color: "bg-red-100 text-red-600",
      action: "View",
    },
    {
      title: "Broadcast Sent This Month",
      value: "14",
      color: "bg-gray-200 text-gray-700",
      action: "See Message",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="
            min-w-0
            overflow-hidden
            rounded-xl
            border
            border-gray-100
            bg-white
            p-4 md:p-5
            shadow-sm
            transition
            hover:shadow-md
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="mt-1 truncate text-xl md:text-2xl font-bold text-gray-900">
              {card.value}
            </h2>
          </div>

          <div className="flex flex-shrink-0 flex-col items-end gap-2">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}
            >
              ●
            </div>

            {card.action && (
              <span className="text-xs text-gray-500 hover:text-black cursor-pointer">
                {card.action} →
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}