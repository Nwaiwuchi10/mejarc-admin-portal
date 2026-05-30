const stats = [
  { title: "Pending Approval", value: 2 },
  { title: "Approved Projects", value: 1 },
  { title: "Rejected Projects", value: 1 },
  { title: "Total Submissions", value: 4 },
];

export default function MarketStats() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((s) => (
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