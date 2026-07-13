interface TopAgentProps {
  agents?: any[];
}

export default function TopAgent({ agents }: TopAgentProps) {
  if (!agents || agents.length === 0) {
    return (
      <div className="bg-white text-[#4a4a4a] p-5 rounded-xl shadow-sm space-y-4 overflow-hidden h-full flex flex-col justify-center items-center py-10">
        <p className="text-gray-400 font-semibold text-sm">No agent stats available</p>
      </div>
    );
  }

  const topAgent = agents[0];

  return (
    <div className="bg-white text-[#4a4a4a] p-5 rounded-xl shadow-sm space-y-4 overflow-hidden h-full">
      <div className="flex justify-between">
        <h3 className="font-semibold">Top Agent</h3>
        <span className="text-xs text-gray-600">Next →</span>
      </div>

      <div className="flex flex-col items-center text-center">
        {topAgent.avatar ? (
          <img
            src={topAgent.avatar}
            alt="Top Agent"
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-black text-xl shadow-sm">
            {topAgent.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        <p className="mt-2 font-semibold text-[#1a1a2e]">{topAgent.name}</p>
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