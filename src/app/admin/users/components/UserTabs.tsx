"use client";

interface UserTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["All Users", "Customers", "Agents", "Staff"];

export default function UserTabs({ activeTab, onTabChange }: UserTabsProps) {
  return (
    <div className="flex gap-6 border-b pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`capitalize pb-2 text-sm font-medium transition ${
            activeTab === tab
              ? "text-[#1a1a2e] border-b-2 border-[#FFC700]"
              : "text-gray-600 hover:text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
