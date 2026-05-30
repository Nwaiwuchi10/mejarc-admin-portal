"use client";

type Accent = "green" | "yellow" | "gray" | "red";

interface StatsCardsProps {
  stats?: any;
}

const accentClasses: Record<Accent, string> = {
  green: "text-emerald-600",
  yellow: "text-amber-600",
  gray: "text-slate-600",
  red: "text-red-600",
};

export default function StatsCards({ stats: propStats }: StatsCardsProps) {
  const displayStats = [
    { title: "Custom Ongoing Projects", value: propStats?.ongoing?.toString() || "12", subtitle: "5.2% Last week", accent: "green" as Accent, label: "View" },
    { title: "Completed Projects", value: propStats?.completed?.toString() || "45", subtitle: "25.2% Last week", accent: "yellow" as Accent, label: "View" },
    { title: "Cancelled Projects", value: propStats?.cancelled?.toString() || "3", subtitle: "25.2% Last week", accent: "gray" as Accent, label: "View" },
    { title: "Disputed Projects", value: propStats?.disputed?.toString() || "5", subtitle: "25.2% Last week", accent: "red" as Accent, label: "View" },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-4">
    
      {displayStats.map((item) => (
        <div key={item.title} className="rounded-[24px] border border-[#e6e8f2] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#1a1a2e]">{item.title}</p>
              <p className="mt-4 text-3xl font-semibold text-[#1a1a2e]">{item.value}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${accentClasses[item.accent]}`}>
              {item.label}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-gray-600">{item.subtitle}</p>
            <div className={`h-10 w-10 rounded-full bg-[rgba(255,199,0,0.12)] ${accentClasses[item.accent]} flex items-center justify-center font-bold`}>
              ●
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}