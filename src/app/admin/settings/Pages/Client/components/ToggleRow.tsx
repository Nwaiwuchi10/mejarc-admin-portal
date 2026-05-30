type Props = {
  label: string;
  enabled: boolean;
  onToggle: () => void;
};

export default function ToggleRow({ label, enabled, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <p className="text-sm text-gray-600">{label}</p>

      <button
        onClick={onToggle}
        className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}