"use client";

import { useState } from "react";
import ToggleRow from "./ToggleRow";

export default function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(true);
  const [activityLogs, setActivityLogs] = useState(true);

  const [passwordStrength, setPasswordStrength] = useState("Strong");
  const [timeout, setTimeoutValue] = useState("15 mins");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-8">
      
      <h2 className="text-base font-semibold text-gray-900 mb-6">
        Security Settings
      </h2>

      <div className="divide-y">

        {/* Toggle */}
        <ToggleRow
          label="Two-Factor Authentication"
          enabled={twoFA}
          onToggle={() => setTwoFA(!twoFA)}
        />

        {/* Password Strength */}
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-600">Password Strength</p>

          <select
            value={passwordStrength}
            onChange={(e) => setPasswordStrength(e.target.value)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none"
          >
            <option>Weak</option>
            <option>Medium</option>
            <option>Strong</option>
          </select>
        </div>

        {/* Session Timeout */}
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-600">Session Timeout</p>

          <select
            value={timeout}
            onChange={(e) => setTimeoutValue(e.target.value)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none"
          >
            <option>5 mins</option>
            <option>10 mins</option>
            <option>15 mins</option>
            <option>30 mins</option>
          </select>
        </div>

        {/* Toggle */}
        <ToggleRow
          label="Activity Logs"
          enabled={activityLogs}
          onToggle={() => setActivityLogs(!activityLogs)}
        />

      </div>
    </div>
  );
}