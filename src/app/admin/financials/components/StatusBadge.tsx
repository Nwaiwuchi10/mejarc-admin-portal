type StatusBadgeProps = {
  status: string;
};

const statusClasses: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Released: "bg-emerald-100 text-emerald-700",
  "Pending Release": "bg-amber-100 text-amber-700",
  "Under Review": "bg-amber-100 text-amber-700",
  "Partial Refund": "bg-amber-100 text-amber-700",
  "Refunded": "bg-emerald-100 text-emerald-700",
  "Cancelled": "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusClasses[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}