interface MarketStatsProps {
  stats?: any;
}

export default function MarketStats({ stats }: MarketStatsProps) {
  const displayStats = [
    { title: "Pending Approval", value: stats?.pending ?? 0 },
    { title: "Approved Products", value: stats?.approved ?? 0 },
    { title: "Rejected Products", value: stats?.rejected ?? 0 },
    { title: "Total Submissions", value: stats?.total ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {displayStats.map((s) => (
        <div key={s.title} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-semibold">{s.title}</p>
          <h2 className="text-2xl font-black mt-1 text-[#1a1a2e]">{s.value}</h2>
        </div>
      ))}
    </div>
  );
}