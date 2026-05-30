type MarketStatus = "Pending Approval" | "Approved" | "Rejected";

function StatusBadge({ status }: { status: MarketStatus }) {
  const styles = {
    "Pending Approval": "bg-amber-100 text-amber-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
  }[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
export type { MarketStatus };