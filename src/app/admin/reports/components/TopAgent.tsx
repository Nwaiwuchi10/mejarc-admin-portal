interface TopAgentProps {
  agents?: any[];
}

export default function TopAgent({ agents }: TopAgentProps) {
  const topAgent = agents && agents.length > 0 ? agents[0] : {
    name: "Roland Emmanuel",
    avatar: "https://i.pravatar.cc/100",
    projectsCompleted: 21,
    earnings: 600000,
    rating: 4.5,
    completionRate: "89%"
  };

  return (
    <div className="bg-white text-[#4a4a4a] p-5 rounded-xl shadow-sm space-y-4 overflow-hidden h-full">
      <div className="flex justify-between">
        <h3 className="font-semibold">Top Agent</h3>
        <span className="text-xs text-gray-600">Next →</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src={topAgent.avatar || "https://i.pravatar.cc/100"}
          alt="Top Agent"
          className="w-16 h-16 rounded-full object-cover"
        />
        <p className="mt-2 font-medium">{topAgent.name}</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="bg-gray-100 p-3 rounded">Projects Completed: {topAgent.projectsCompleted}</div>
        <div className="bg-gray-100 p-3 rounded">Total Earnings: ₦{topAgent.earnings?.toLocaleString()}</div>
        <div className="bg-gray-100 p-3 rounded">Average Rating: {topAgent.rating}</div>
        <div className="bg-gray-100 p-3 rounded">Completion Rate: {topAgent.completionRate || 'N/A'}</div>
      </div>
    </div>
  );
}