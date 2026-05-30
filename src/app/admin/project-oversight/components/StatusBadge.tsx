type Status = "Ongoing" | "Disputed" | "Cancelled";

export default function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Ongoing: "bg-yellow-400 text-black",
    Disputed: "bg-red-500 text-white",
    Cancelled: "bg-gray-400 text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status] || "bg-gray-200 text-black"}`}>
      {status}
    </span>
  );
}