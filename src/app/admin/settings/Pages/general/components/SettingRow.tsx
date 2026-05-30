type Props = {
  label: string;
  value: string;
  editable?: boolean;
};

export default function SettingRow({ label, value, editable }: Props) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <p className="text-sm text-gray-600">{label}</p>

      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-900">{value}</p>
        {editable && (
          <span className="text-gray-600 cursor-pointer hover:text-gray-700">
            ✏️
          </span>
        )}
      </div>
    </div>
  );
}