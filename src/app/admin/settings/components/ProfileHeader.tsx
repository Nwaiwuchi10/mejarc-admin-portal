export default function ProfileHeader() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100"
          className="w-16 h-16 rounded-full border"
        />

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Roland Emmanuel
          </h2>
          <p className="text-sm text-gray-600">Super Admin</p>
          <p className="text-xs text-gray-400">
            Shapati Ibeju Lekki Lagos
          </p>
        </div>
      </div>

      <button className="px-4 text-[#4a4a4a] py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition">
        Profile Change ✏️
      </button>
    </div>
  );
}