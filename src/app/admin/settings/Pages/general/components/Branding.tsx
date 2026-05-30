import { ColorCard } from "./ColorCard";

export default function Branding() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
      
      <h2 className="text-base font-semibold text-gray-900">
        Branding & Design System
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Logo */}
        <div className="space-y-2">
          <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="font-bold text-gray-600">MEJARC</span>
          </div>
          <button className="w-full text-sm text-gray-900 bg-gray-100 rounded-lg py-2 hover:bg-gray-200">
            Upload logo ✏️
          </button>
        </div>

        {/* Yellow */}
        <ColorCard color="bg-yellow-500" code="FFC100" />

        {/* Black */}
        <ColorCard color="bg-black" code="000000" />

        {/* Light Gray */}
        <ColorCard color="bg-gray-100 border" code="F5F5F5" />
      </div>
    </div>
  );
}