type Props = {
  color: string;
  code: string;
};

export function ColorCard({ color, code }: Props) {
  return (
    <div className="space-y-2">
      
      <div className={`h-40 rounded-xl relative ${color}`}>
        <span className="absolute top-2 left-2 text-xs bg-white px-2 py-1 rounded shadow">
          {code}
        </span>
      </div>

      <button className="w-full text-sm bg-gray-100 rounded-lg py-2 hover:bg-gray-200">
        Paste Code ✏️
      </button>
    </div>
  );
}