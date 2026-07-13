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
        <InfoRow label="First Name" value={profile?.firstName || "N/A"} />
        <InfoRow label="Last Name" value={profile?.lastName || "N/A"} />
        <InfoRow label="Email Address" value={profile?.email || "N/A"} />
        <InfoRow label="Phone Number" value={profile?.phoneNumber || "N/A"} />
        <InfoRow label="Role" value={profile?.adminRole || "N/A"} />
      </div>
    </div>
  );
}