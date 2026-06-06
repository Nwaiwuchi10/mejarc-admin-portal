type Props = {
  activeTab: string;
  setActiveTab: (val: string) => void;
};

export default function TabsBar({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs = [
    "Customer Transactions",
    "Agent Payouts",
    "Disputed",
    "Refunds",
    "Vendor Withdrawals",
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      
      <div className="flex min-w-max gap-3 pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-[#FFC700] text-[#1a1a2e] shadow-md shadow-yellow-400/30"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-[#1a1a2e]"
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

    </div>
  );
}