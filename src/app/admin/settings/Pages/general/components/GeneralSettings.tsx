import SettingRow from "./SettingRow";

export default function GeneralSettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        General Settings
      </h2>

      <div className="divide-y">
        <SettingRow label="Company Name" value="Mejarc" />
        <SettingRow label="Support Email" value="support@mejarc.com" editable />
        <SettingRow label="Contact Number" value="+234 800 123 4567" editable />
        <SettingRow label="Office Address" value="Lagos, Nigeria" editable />

        {/* Language */}
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-600">Default Language</p>

          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-gray-50 focus:outline-none">
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
  );
}