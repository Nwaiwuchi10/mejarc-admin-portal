interface ProfileHeaderProps {
  profile?: any;
  onEdit?: () => void;
}

export default function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div className="flex items-center gap-4">
        {profile?.profilePics || profile?.profilePicture ? (
          <img
            src={profile.profilePics || profile.profilePicture}
            alt="Profile Picture"
            className="w-16 h-16 rounded-full border object-cover border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-black text-xl shadow-sm">
            {profile?.firstName?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {profile ? `${profile.firstName} ${profile.lastName}` : "Roland Emmanuel"}
          </h2>
          <p className="text-sm text-gray-600">{profile?.adminRole || "Super Admin"}</p>
          <p className="text-xs text-gray-600">
            {profile?.address || "Shapati Ibeju Lekki Lagos"}
          </p>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="px-4 text-[#4a4a4a] py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      >
        Profile Change ✏️
      </button>
    </div>
  );
}