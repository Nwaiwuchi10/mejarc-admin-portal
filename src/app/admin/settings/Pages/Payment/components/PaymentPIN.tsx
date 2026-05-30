"use client";
import FormRow from "./FormRow"

import { useState } from "react";

export default function PaymentPIN() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-8 space-y-10">
      
      {/* ===== SET PIN ===== */}
      <div className="space-y-6">
        <h2 className="text-base font-semibold text-gray-900">
          Set Payment PIN
        </h2>

        <FormRow
          label="Set PIN"
          value={pin}
          onChange={setPin}
        />

        <FormRow
          label="Confirm PIN"
          value={confirmPin}
          onChange={setConfirmPin}
        />

        <div className="flex justify-end">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full text-sm font-medium transition">
            Confirm
          </button>
        </div>
      </div>

      {/* ===== FORGOT PIN ===== */}
      <div className="space-y-6">
        <h2 className="text-base font-semibold text-gray-900">
          Forgot Payment PIN
        </h2>

        <FormRow
          label="Set New PIN"
          value={newPin}
          onChange={setNewPin}
        />

        <FormRow
          label="Confirm PIN"
          value={confirmNewPin}
          onChange={setConfirmNewPin}
        />

        <div className="flex justify-end">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full text-sm font-medium transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}