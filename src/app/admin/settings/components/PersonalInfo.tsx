import { InfoRow } from "./InfoRow";

export default function PersonalInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
      
      <h3 className="text-sm font-semibold text-gray-800">
        Personal Information
      </h3>

      <div className="divide-y">
        <InfoRow label="First Name" value="Roland" />
        <InfoRow label="Last Name" value="Emmanuel" />
        <InfoRow label="Email Address" value="rolandemmanuel03@gmail.com" />
        <InfoRow label="Phone Number" value="234 8840 492 4922" />
        <InfoRow label="Bio" value="Product Designer" />
      </div>
    </div>
  );
}