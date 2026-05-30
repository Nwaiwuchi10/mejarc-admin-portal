type Props = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: Props) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}