interface MarketStatsProps {
  stats?: any;
}

export default function MarketStats({ stats }: MarketStatsProps) {
  const displayStats = [
    { title: "Pending Approval", value: stats?.pending || 2 },
    { title: "Approved Products", value: stats?.approved || 1 },
    { title: "Rejected Products", value: stats?.rejected || 1 },
    { title: "Total Submissions", value: stats?.total || 4 },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {displayStats.map((s) => (
        <div key={s.title} className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">{s.title}</p>
          <h2 className="text-2xl font-semibold">{s.value}</h2>
          <p className="text-xs text-gray-600 mt-1">25.2% Last week</p>
          <div className="h-8 mt-3 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}