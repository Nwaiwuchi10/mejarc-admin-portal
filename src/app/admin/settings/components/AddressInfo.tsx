import { InfoRow } from "./InfoRow";

export default function AddressInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
      
      <h3 className="text-sm font-semibold text-gray-800">
        Address
      </h3>

      <div className="divide-y">
        <InfoRow label="Country" value="Nigeria" />
        <InfoRow label="City" value="Lagos" />
        <InfoRow label="State" value="100001" />
        <InfoRow label="Postal Code" value="100001" />
      </div>
    </div>
  );
}