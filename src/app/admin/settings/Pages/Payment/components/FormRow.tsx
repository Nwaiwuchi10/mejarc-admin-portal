type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

export default function FormRow({ label, value, onChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      
      {/* Label */}
      <label className="w-full md:w-48 text-sm text-gray-600">
        {label}
      </label>

      {/* Input */}
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="************"
        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}