type Props = {
  type: "status" | "verification";
  value: string;
};

export default function Badge({ type, value }: Props) {
  const styles = {
    Verified: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-black text-white",
    Active: "bg-green-500 text-green-700",
    Suspended: "bg-red-500 text-white-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        styles[value as keyof typeof styles]
      }`}
    >
      {value}
    </span>
  );
}