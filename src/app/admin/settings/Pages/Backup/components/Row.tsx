export default function Row({
  label,
  right,
}: {
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 last:border-none">
      <span className="text-sm text-gray-600">{label}</span>
      {right}
    </div>
  );
}