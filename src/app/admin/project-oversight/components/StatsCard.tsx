"use client";

const stats: {
  title: string;
  value: string;
  subtitle: string;
  accent: Accent;
  label: string;
}[] = [
  { title: "Custom Ongoing Projects", value: "12", subtitle: "5.2% Last week", accent: "green", label: "View" },
  { title: "Completed Projects", value: "45", subtitle: "25.2% Last week", accent: "yellow", label: "View" },
  { title: "Cancelled Projects", value: "3", subtitle: "25.2% Last week", accent: "gray", label: "View" },
  { title: "Disputed Projects", value: "5", subtitle: "25.2% Last week", accent: "red", label: "View" },
];

type Accent = "green" | "yellow" | "gray" | "red";

const accentClasses: Record<Accent, string> = {
  green: "text-emerald-600",
  yellow: "text-amber-600",
  gray: "text-slate-600",
  red: "text-red-600",
};

export default function StatsCards() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-4">
    
      {stats.map((item) => (
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
            <p className="text-sm text-gray-500">{item.subtitle}</p>
            <div className={`h-10 w-10 rounded-full bg-[rgba(255,199,0,0.12)] ${accentClasses[item.accent]} flex items-center justify-center font-bold`}>
              ●
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}