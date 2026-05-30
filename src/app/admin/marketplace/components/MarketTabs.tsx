type Props = {
  activeTab: string;
  setActiveTab: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
};

export default function MarketTabs({
  activeTab,
  setActiveTab,
  status,
  setStatus,
}: Props) {
  const tabs = ["Building Plan", "Product Design"];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      
      {/* Tabs */}
      <div className="flex w-full gap-2 overflow-x-auto scrollbar-hide pb-1 lg:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition
              ${
                activeTab === tab
                  ? "bg-[#FFC700] text-[#1a1a2e]"
                  : "bg-white text-gray-500 hover:text-[#1a1a2e] shadow-sm"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex w-full justify-start lg:w-auto lg:justify-end">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full rounded-2xl border border-gray-200 bg-white
            px-4 py-3 text-sm font-medium text-[#1a1a2e]
            outline-none transition
            focus:border-[#FFC700]
            lg:w-[220px]
          "
        >
          <option>All</option>
          <option>Pending Approval</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

    </div>
  );
}