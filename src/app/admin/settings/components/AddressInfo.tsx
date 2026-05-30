import { InfoRow } from "./InfoRow";

interface AddressInfoProps {
  profile?: any;
  onUpdate?: () => void;
}

export default function AddressInfo({ profile }: AddressInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
      
      <h3 className="text-sm font-semibold text-gray-800">
        Address
      </h3>

      <div className="divide-y">
        <InfoRow label="Country" value={profile?.country || "Nigeria"} />
        <InfoRow label="City" value={profile?.city || "Lagos"} />
        <InfoRow label="State" value={profile?.state || "Lagos"} />
        <InfoRow label="Postal Code" value={profile?.postalCode || "100001"} />
      </div>
    </div>
  );
}