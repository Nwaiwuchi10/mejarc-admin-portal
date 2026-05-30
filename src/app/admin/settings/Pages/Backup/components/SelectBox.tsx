import { ChevronDown } from "lucide-react";

export default function SelectBox({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md cursor-pointer">
      {value}
      <ChevronDown size={16} />
    </div>
  );
}