export default function TopAgent() {
  return (
    <div className="bg-white text-[#4a4a4a] p-5 rounded-xl shadow-sm space-y-4 overflow-hidden">
      <div className="flex justify-between">
        <h3 className="font-semibold">Top Agent</h3>
        <span className="text-xs text-gray-500">Next →</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src="https://i.pravatar.cc/100"
          alt="Top Agent"
          className="w-16 h-16 rounded-full"
        />
        <p className="mt-2 font-medium">Roland Emmanuel</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="bg-gray-100 p-3 rounded">Projects Completed: 21</div>
        <div className="bg-gray-100 p-3 rounded">Total Earnings: ₦600,000</div>
        <div className="bg-gray-100 p-3 rounded">Average Rating: 4.5</div>
        <div className="bg-gray-100 p-3 rounded">Completion Rate: 89%</div>
      </div>
    </div>
  );
}