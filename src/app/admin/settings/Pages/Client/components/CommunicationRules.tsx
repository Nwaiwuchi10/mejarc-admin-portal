"use client";

import { useState } from "react";
import ToggleRow from "./ToggleRow";

export default function CommunicationRules() {
  const [directChat, setDirectChat] = useState(false);
  const [escalation, setEscalation] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Communication Rules
      </h2>

      <div className="divide-y">

        <ToggleRow
          label="Customer ↔ Agent Direct Chat"
          enabled={directChat}
          onToggle={() => setDirectChat(!directChat)}
        />

        {/* Static Row */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <p className="text-sm text-gray-600">Communication Channel</p>
          <p className="text-sm font-medium text-gray-900">
            Through Support Team
          </p>
        </div>

        <ToggleRow
          label="Message Escalation"
          enabled={escalation}
          onToggle={() => setEscalation(!escalation)}
        />
      </div>
    </div>
  );
}