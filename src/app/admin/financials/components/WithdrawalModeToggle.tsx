"use client";

import React, { useState, useEffect } from "react";
import { Zap, ShieldCheck, CheckCircle2, RefreshCw, AlertTriangle, Settings2, ChevronDown, ChevronUp, DollarSign } from "lucide-react";
import { financialService } from "@/src/services/financialService";

interface WithdrawalModeToggleProps {
  onModeChanged?: (newMode: "AUTO" | "MANUAL") => void;
}

export default function WithdrawalModeToggle({ onModeChanged }: WithdrawalModeToggleProps) {
  const [mode, setMode] = useState<"AUTO" | "MANUAL">("AUTO");
  const [threshold, setThreshold] = useState<number>(100000);
  const [minAmount, setMinAmount] = useState<number>(1000);
  const [maxAmount, setMaxAmount] = useState<number>(5000000);

  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
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

  const handleToggle = async () => {
    const targetMode: "AUTO" | "MANUAL" = mode === "AUTO" ? "MANUAL" : "AUTO";
    setUpdating(true);
    setMessage(null);

    const res = await financialService.updateWithdrawalSettings({
      mode: targetMode,
      minWithdrawalAmount: minAmount,
      maxWithdrawalAmount: maxAmount,
      autoApproveThreshold: threshold,
    });
    setUpdating(false);

    if (res && !res.error && res.mode) {
      setMode(res.mode.toUpperCase() === "MANUAL" ? "MANUAL" : "AUTO");
      setMessage({
        text:
          targetMode === "AUTO"
            ? "Switched to Auto Withdrawal: Paystack automated payouts are now active."
            : "Switched to Manual Withdrawal: All vendor requests now require Admin vetting and manual disbursement.",
        type: "success",
      });
      if (onModeChanged) onModeChanged(targetMode);
    } else {
      setMessage({
        text: res?.message || "Failed to update withdrawal system mode",
        type: "error",
      });
    }

    setTimeout(() => setMessage(null), 6000);
  };

  const handleSaveLimits = async () => {
    if (minAmount > maxAmount) {
      setMessage({
        text: "Minimum withdrawal amount cannot be greater than maximum withdrawal amount.",
        type: "error",
      });
      return;
    }

    setUpdating(true);
    setMessage(null);

    const res = await financialService.updateWithdrawalSettings({
      mode,
      minWithdrawalAmount: Number(minAmount),
      maxWithdrawalAmount: Number(maxAmount),
      autoApproveThreshold: Number(threshold),
    });
    setUpdating(false);

    if (res && !res.error && res.mode) {
      setMessage({
        text: `Limits saved successfully: Min ₦${minAmount.toLocaleString()} | Max ₦${maxAmount.toLocaleString()} | Auto-Threshold ₦${threshold.toLocaleString()}`,
        type: "success",
      });
      setShowConfig(false);
      if (onModeChanged) onModeChanged(mode);
    } else {
      setMessage({
        text: res?.message || "Failed to save withdrawal limits",
        type: "error",
      });
    }

    setTimeout(() => setMessage(null), 6000);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left side: Mode info */}
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
              mode === "AUTO"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}
          >
            {mode === "AUTO" ? <Zap size={22} /> : <ShieldCheck size={22} />}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-[#1a1a2e] m-0">
                Vendor Withdrawal Mode:{" "}
                <span className={mode === "AUTO" ? "text-emerald-600" : "text-amber-600"}>
                  {mode === "AUTO" ? "Automated Payout" : "Manual Admin Vetting"}
                </span>
              </h3>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  mode === "AUTO"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {mode === "AUTO" ? "Auto-Transfer Active" : "Manual Vetting Active"}
              </span>
            </div>

            <p className="text-xs text-gray-500 m-0 mt-1 max-w-2xl leading-relaxed">
              {mode === "AUTO" ? (
                <>
                  Vendor withdrawal requests up to <strong>₦{threshold.toLocaleString()}</strong> are verified and paid automatically via Paystack transfers. Larger amounts require Admin clearance before queueing. Limits: <strong>₦{minAmount.toLocaleString()}</strong> to <strong>₦{maxAmount.toLocaleString()}</strong>.
                </>
              ) : (
                <>
                  Vendor withdrawal requests are placed on hold as <strong>Pending Admin Review</strong>. Admins manually review bank details, disburse funds, and approve/mark as paid or reject with refund. Limits: <strong>₦{minAmount.toLocaleString()}</strong> to <strong>₦{maxAmount.toLocaleString()}</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right side: Action Buttons */}
        <div className="flex items-center gap-2.5 self-end md:self-center flex-wrap">
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border-0 cursor-pointer"
          >
            <Settings2 size={14} className="text-gray-500" />
            <span>Limits & Thresholds</span>
            {showConfig ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button
            onClick={handleToggle}
            disabled={loading || updating}
            className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer disabled:opacity-60 border-0 ${
              mode === "AUTO"
                ? "bg-[#1a1a2e] text-white hover:bg-[#2a2a4e]"
                : "bg-[#FFC700] text-[#1a1a2e] hover:bg-[#e5b300]"
            }`}
          >
            {updating && <RefreshCw size={14} className="animate-spin" />}
            <span>
              {updating
                ? "Updating..."
                : mode === "AUTO"
                ? "Switch to Manual Mode"
                : "Switch to Auto Mode"}
            </span>
          </button>
        </div>
      </div>

      {/* ── EXPANDABLE LIMITS CONFIGURATION ── */}
      {showConfig && (
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h4 className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wider m-0 flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#FFC700]" />
              Configure Min, Max & Auto-Approval Limits
            </h4>
            <span className="text-[11px] text-gray-500">Applies across all vendor withdrawal actions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Minimum Withdrawal (₦)
              </label>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                min={100}
                className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
              />
              <span className="text-[10px] text-gray-500 mt-0.5 block">Smallest allowed withdrawal</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Maximum Withdrawal (₦)
              </label>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(Number(e.target.value))}
                min={minAmount}
                className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
              />
              <span className="text-[10px] text-gray-500 mt-0.5 block">Maximum allowed per request</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Auto-Approve Threshold (₦)
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                min={minAmount}
                className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
              />
              <span className="text-[10px] text-gray-500 mt-0.5 block">Auto-paid if in Auto Mode</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded-xl border-0 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveLimits}
              disabled={updating}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#1a1a2e] hover:bg-[#2a2a4e] rounded-xl border-0 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              {updating && <RefreshCw size={12} className="animate-spin" />}
              <span>Save Limits</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast / Message Banner */}
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
    </div>
  );
}
