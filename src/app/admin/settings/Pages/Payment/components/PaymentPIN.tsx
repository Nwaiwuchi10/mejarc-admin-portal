"use client";

import React, { useState, useEffect } from "react";
import FormRow from "./FormRow";
import { Zap, ShieldCheck, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import { financialService } from "@/src/services/financialService";

export default function PaymentPIN() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");

  // Withdrawal Mode State
  const [mode, setMode] = useState<"AUTO" | "MANUAL">("AUTO");
  const [threshold, setThreshold] = useState<number>(100000);
  const [minAmount, setMinAmount] = useState<number>(1000);
  const [maxAmount, setMaxAmount] = useState<number>(5000000);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingSettings, setSavingSettings] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const res = await financialService.getWithdrawalSettings();
    if (res && res.mode) {
      setMode(res.mode.toUpperCase() === "MANUAL" ? "MANUAL" : "AUTO");
      if (res.autoApproveThreshold !== undefined) setThreshold(Number(res.autoApproveThreshold));
      if (res.minWithdrawalAmount !== undefined) setMinAmount(Number(res.minWithdrawalAmount));
      if (res.maxWithdrawalAmount !== undefined) setMaxAmount(Number(res.maxWithdrawalAmount));
    }
    setLoading(false);
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    setMessage(null);
    const res = await financialService.updateWithdrawalSettings({
      mode,
      autoApproveThreshold: Number(threshold),
      minWithdrawalAmount: Number(minAmount),
      maxWithdrawalAmount: Number(maxAmount),
    });
    setSavingSettings(false);

    if (res && !res.error && res.mode) {
      setMessage({
        text: `Withdrawal settings updated successfully. Mode: ${mode === "AUTO" ? "Automated Paystack" : "Manual Admin Vetting"} (Min ₦${Number(minAmount).toLocaleString()} | Max ₦${Number(maxAmount).toLocaleString()})`,
        type: "success",
      });
    } else {
      setMessage({
        text: res?.message || "Failed to update withdrawal settings",
        type: "error",
      });
    }
    setTimeout(() => setMessage(null), 6000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 space-y-10">
      {/* ===== VENDOR WITHDRAWAL MODE CONFIGURATION ===== */}
      <div className="space-y-6 pb-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              mode === "AUTO"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}
          >
            {mode === "AUTO" ? <Zap size={20} /> : <ShieldCheck size={20} />}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1a1a2e] m-0">Vendor Withdrawal System Mode</h2>
            <p className="text-xs text-gray-500 m-0">
              Configure automated Paystack transfers or manual Admin approval workflow
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setMode("AUTO")}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              mode === "AUTO"
                ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-emerald-600" />
                <span className="font-bold text-sm text-[#1a1a2e]">Automated Paystack Mode</span>
              </div>
              <input
                type="radio"
                name="withdrawalMode"
                checked={mode === "AUTO"}
                onChange={() => setMode("AUTO")}
                className="accent-emerald-600"
              />
            </div>
            <p className="text-xs text-gray-600 m-0 leading-relaxed">
              Approved requests are queued and disbursed automatically to vendor bank accounts via Paystack integration.
            </p>
          </div>

          <div
            onClick={() => setMode("MANUAL")}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              mode === "MANUAL"
                ? "border-amber-500 bg-amber-50/50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-600" />
                <span className="font-bold text-sm text-[#1a1a2e]">Manual Admin Vetting Mode</span>
              </div>
              <input
                type="radio"
                name="withdrawalMode"
                checked={mode === "MANUAL"}
                onChange={() => setMode("MANUAL")}
                className="accent-amber-600"
              />
            </div>
            <p className="text-xs text-gray-600 m-0 leading-relaxed">
              Requests require admin vetting, manual bank transfer disbursement, and manual confirmation in the portal.
            </p>
          </div>
        </div>

        {/* Threshold Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Minimum Withdrawal (₦)
            </label>
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(Number(e.target.value))}
              placeholder="1000"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              Minimum funds required to initiate a withdrawal.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Maximum Withdrawal (₦)
            </label>
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(Number(e.target.value))}
              placeholder="5000000"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              Maximum allowed per single withdrawal request.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Auto-Approve Threshold (₦)
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              placeholder="100000"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              Auto-paid if in Auto mode.
            </span>
          </div>
        </div>

        {message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={savingSettings || loading}
            className="bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border-0 cursor-pointer shadow-sm disabled:opacity-50"
          >
            {savingSettings && <RefreshCw size={13} className="animate-spin" />}
            <span>Save Withdrawal Configuration</span>
          </button>
        </div>
      </div>

      {/* ===== SET PIN ===== */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-[#1a1a2e]">Set Payment PIN</h2>

        <FormRow label="Set PIN" value={pin} onChange={setPin} />
        <FormRow label="Confirm PIN" value={confirmPin} onChange={setConfirmPin} />

        <div className="flex justify-end">
          <button className="bg-[#FFC700] hover:bg-[#e5b300] text-[#1a1a2e] px-6 py-2 rounded-xl text-xs font-bold transition border-0 cursor-pointer">
            Confirm
          </button>
        </div>
      </div>

      {/* ===== FORGOT PIN ===== */}
      <div className="space-y-6 pt-6 border-t border-gray-100">
        <h2 className="text-base font-bold text-[#1a1a2e]">Forgot Payment PIN</h2>

        <FormRow label="Set New PIN" value={newPin} onChange={setNewPin} />
        <FormRow label="Confirm PIN" value={confirmNewPin} onChange={setConfirmNewPin} />

        <div className="flex justify-end">
          <button className="bg-[#FFC700] hover:bg-[#e5b300] text-[#1a1a2e] px-6 py-2 rounded-xl text-xs font-bold transition border-0 cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}