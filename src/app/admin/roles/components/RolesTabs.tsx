type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function RolesTabs({ activeTab, setActiveTab }: Props) {
  const tabs = ["Roles", "Staff Assignment", "Permission Matrix"];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition
              ${
                activeTab === tab
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Action Button */}
      <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg text-sm font-semibold transition w-full sm:w-auto">
        Create New Role
      </button>
    </div>
  );
}