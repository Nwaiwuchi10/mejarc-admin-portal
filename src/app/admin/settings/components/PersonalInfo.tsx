import { InfoRow } from "./InfoRow";

interface PersonalInfoProps {
  profile?: any;
  onUpdate?: () => void;
}

export default function PersonalInfo({ profile }: PersonalInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
      
      <h3 className="text-sm font-semibold text-gray-800">
        Personal Information
      </h3>

      <div className="divide-y">
        <InfoRow label="First Name" value={profile?.firstName || "Roland"} />
        <InfoRow label="Last Name" value={profile?.lastName || "Emmanuel"} />
        <InfoRow label="Email Address" value={profile?.email || "rolandemmanuel03@gmail.com"} />
        <InfoRow label="Phone Number" value={profile?.phoneNumber || "234 8840 492 4922"} />
        <InfoRow label="Bio" value={profile?.bio || "Admin User"} />
      </div>
    </div>
  );
}