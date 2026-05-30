"use client";

import { useState } from "react";
import ToggleRow from "./ToggleRow";

export default function ClientSettings() {
  const [settings, setSettings] = useState({
    portal: true,
    feedback: true,
    comments: true,
    approval: true,
    notify: true,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Client & Collaboration Settings
      </h2>

      <div className="divide-y">
        <ToggleRow
          label="Client Portal Access"
          enabled={settings.portal}
          onToggle={() =>
            setSettings({ ...settings, portal: !settings.portal })
          }
        />
        <ToggleRow
          label="Allow Client Feedback"
          enabled={settings.feedback}
          onToggle={() =>
            setSettings({ ...settings, feedback: !settings.feedback })
          }
        />
        <ToggleRow
          label="Comment on Designs"
          enabled={settings.comments}
          onToggle={() =>
            setSettings({ ...settings, comments: !settings.comments })
          }
        />
        <ToggleRow
          label="Approval Required Before Delivery"
          enabled={settings.approval}
          onToggle={() =>
            setSettings({ ...settings, approval: !settings.approval })
          }
        />
        <ToggleRow
          label="Auto Notify Client on Update"
          enabled={settings.notify}
          onToggle={() =>
            setSettings({ ...settings, notify: !settings.notify })
          }
        />
      </div>
    </div>
  );
}