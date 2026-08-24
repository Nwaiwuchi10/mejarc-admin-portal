import { InfoRow } from "./InfoRow";

interface AddressInfoProps {
  profile?: any;
  onUpdate?: () => void;
}

export default function AddressInfo({ profile }: AddressInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
      
      <h3 className="text-sm font-semibold text-gray-800">
        Address Details
      </h3>

      <div className="divide-y">
        <InfoRow label="Street" value={profile?.address?.street || profile?.street || (typeof profile?.address === "string" ? profile.address : "N/A")} />
        <InfoRow label="City" value={profile?.address?.city || profile?.city || "N/A"} />
        <InfoRow label="State" value={profile?.address?.state || profile?.state || "N/A"} />
        <InfoRow label="Country" value={profile?.address?.country || profile?.country || "N/A"} />
      </div>
    </div>
  );
}