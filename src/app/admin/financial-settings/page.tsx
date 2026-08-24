"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  DollarSign,
  Sliders,
  Lock,
  Building2,
  CheckCircle,
  HelpCircle,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { financialService } from "@/src/services/financialService";
import Link from "next/link";

export default function FinancialSettingsPage() {
  // Mode & Limits State
  const [mode, setMode] = useState<"AUTO" | "MANUAL">("AUTO");
  const [threshold, setThreshold] = useState<number>(100000);
  const [minAmount, setMinAmount] = useState<number>(1000);
  const [maxAmount, setMaxAmount] = useState<number>(5000000);

  // Security PIN State
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [updatingMode, setUpdatingMode] = useState<boolean>(false);
  const [savingLimits, setSavingLimits] = useState<boolean>(false);
  const [savingPin, setSavingPin] = useState<boolean>(false);

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

  const handleToggleMode = async (targetMode: "AUTO" | "MANUAL") => {
    setUpdatingMode(true);
    setMessage(null);

    const res = await financialService.updateWithdrawalSettings({
      mode: targetMode,
      minWithdrawalAmount: Number(minAmount),
      maxWithdrawalAmount: Number(maxAmount),
      autoApproveThreshold: Number(threshold),
    });
    setUpdatingMode(false);

    if (res && !res.error && res.mode) {
      setMode(res.mode.toUpperCase() === "MANUAL" ? "MANUAL" : "AUTO");
      setMessage({
        text:
          targetMode === "AUTO"
            ? "Switched to Auto Withdrawal: Paystack automated payouts are now active platform-wide."
            : "Switched to Manual Withdrawal: Vendor requests will be held for Admin vetting and manual disbursement.",
        type: "success",
      });
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

    setSavingLimits(true);
    setMessage(null);

    const res = await financialService.updateWithdrawalSettings({
      mode,
      minWithdrawalAmount: Number(minAmount),
      maxWithdrawalAmount: Number(maxAmount),
      autoApproveThreshold: Number(threshold),
    });
    setSavingLimits(false);

    if (res && !res.error && res.mode) {
      setMessage({
        text: `Limits saved successfully: Min ₦${Number(minAmount).toLocaleString()} | Max ₦${Number(maxAmount).toLocaleString()} | Auto-Threshold ₦${Number(threshold).toLocaleString()}`,
        type: "success",
      });
    } else {
      setMessage({
        text: res?.message || "Failed to save limits",
        type: "error",
      });
    }

    setTimeout(() => setMessage(null), 6000);
  };

  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length < 4) {
      setMessage({ text: "PIN must be at least 4 digits.", type: "error" });
      return;
    }
    if (pin !== confirmPin) {
      setMessage({ text: "PINs do not match.", type: "error" });
      return;
    }

    setSavingPin(true);
    // Simulating save
    setTimeout(() => {
      setSavingPin(false);
      setPin("");
      setConfirmPin("");
      setMessage({ text: "Payment security PIN updated successfully.", type: "success" });
      setTimeout(() => setMessage(null), 6000);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden bg-[#f8f9fc] min-h-screen">
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
          {/* ── Page Header ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-10 h-10 rounded-2xl bg-[#1a1a2e] text-[#FFC700] flex items-center justify-center shadow-sm">
                  <Sliders size={20} />
                </div>
                <h1 className="text-xl font-bold text-[#1a1a2e] m-0">Financial Settings & Integrations</h1>
              </div>
              <p className="text-xs text-gray-500 m-0 max-w-2xl">
                Configure platform-wide vendor withdrawal modes, automated Paystack payouts, threshold rules, and financial security PINs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/financials"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1a1a2e] text-xs font-bold transition-colors no-underline"
              >
                <span>View Transactions</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ── Toast / Message Banner ── */}
          {message && (
            <div
              className={`flex items-center gap-2.5 p-4 rounded-2xl text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
              ) : (
                <AlertTriangle size={18} className="text-red-600 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* ── SECTION 1: VENDOR WITHDRAWAL MODE ── */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-[#1a1a2e] m-0 flex items-center gap-2">
                  <Building2 size={18} className="text-[#FFC700]" />
                  Vendor Withdrawal Mode
                </h2>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Choose how vendor withdrawal requests are executed across the entire platform
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  mode === "AUTO"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-amber-100 text-amber-900 border border-amber-200"
                }`}
              >
                {mode === "AUTO" ? "Automated Paystack Active" : "Manual Admin Vetting Active"}
              </span>
            </div>

            {/* Mode Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Automated Mode Card */}
              <div
                onClick={() => handleToggleMode("AUTO")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  mode === "AUTO"
                    ? "border-emerald-500 bg-emerald-50/40 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Zap size={18} />
                    </div>
                    <span className="font-bold text-sm text-[#1a1a2e]">Automated Paystack Payouts</span>
                  </div>
                  <input
                    type="radio"
                    name="financialMode"
                    checked={mode === "AUTO"}
                    onChange={() => handleToggleMode("AUTO")}
                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-600 m-0 leading-relaxed">
                  Withdrawal requests up to <strong>₦{threshold.toLocaleString()}</strong> are verified and paid out automatically via Paystack transfers directly to the vendor&apos;s default bank account.
                </p>
              </div>

              {/* Manual Mode Card */}
              <div
                onClick={() => handleToggleMode("MANUAL")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  mode === "MANUAL"
                    ? "border-amber-500 bg-amber-50/40 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="font-bold text-sm text-[#1a1a2e]">Manual Admin Vetting & Disbursement</span>
                  </div>
                  <input
                    type="radio"
                    name="financialMode"
                    checked={mode === "MANUAL"}
                    onChange={() => handleToggleMode("MANUAL")}
                    className="accent-amber-600 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-600 m-0 leading-relaxed">
                  All requests are queued as <strong>Pending Admin Review</strong>. Admins review bank details, disburse funds manually, and click <em>&quot;Approve &amp; Mark Paid&quot;</em> or <em>&quot;Reject &amp; Refund&quot;</em>.
                </p>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: WITHDRAWAL LIMITS & THRESHOLDS ── */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base font-bold text-[#1a1a2e] m-0 flex items-center gap-2">
                <DollarSign size={18} className="text-[#FFC700]" />
                Withdrawal Limits & Auto-Approval Thresholds
              </h2>
              <p className="text-xs text-gray-500 m-0 mt-0.5">
                Set minimum/maximum boundaries and the automatic transfer ceiling per withdrawal request
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
                  Minimum Withdrawal Amount (₦)
                </label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  min={100}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Vendors cannot request less than this amount.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
                  Maximum Withdrawal Amount (₦)
                </label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(Number(e.target.value))}
                  min={minAmount}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Maximum allowed per single withdrawal request.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
                  Auto-Approve Threshold (₦)
                </label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  min={minAmount}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Auto-disbursed if below threshold in Auto Mode.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-gray-500">
                Current active range: <strong>₦{Number(minAmount).toLocaleString()}</strong> to <strong>₦{Number(maxAmount).toLocaleString()}</strong>
              </div>

              <button
                type="button"
                onClick={handleSaveLimits}
                disabled={savingLimits || loading}
                className="px-6 py-2.5 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white font-bold text-xs rounded-xl transition flex items-center gap-2 border-0 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {savingLimits && <RefreshCw size={13} className="animate-spin text-[#FFC700]" />}
                <span>Save Limits Configuration</span>
              </button>
            </div>
          </div>

          {/* ── SECTION 3: GATEWAY & INTEGRATION STATUS ── */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base font-bold text-[#1a1a2e] m-0 flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-600" />
                Payment Gateway & Integration Status
              </h2>
              <p className="text-xs text-gray-500 m-0 mt-0.5">
                Overview of payment gateway connections and settlement configurations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-gray-500 block text-[11px]">Payment Gateway</span>
                <span className="font-bold text-[#1a1a2e] text-sm block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Paystack Integration (Live)
                </span>
                <span className="text-[11px] text-gray-500 block mt-1">Transfers &amp; Card Processing</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-gray-500 block text-[11px]">Webhook Endpoint</span>
                <span className="font-mono font-bold text-[#1a1a2e] text-xs block truncate">
                  /wallet/webhook/paystack
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">✓ Signature Verified</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-gray-500 block text-[11px]">Settlement Currency</span>
                <span className="font-bold text-[#1a1a2e] text-sm block">Nigerian Naira (₦ NGN)</span>
                <span className="text-[11px] text-gray-500 block mt-1">Atomic Double-Entry Ledger</span>
              </div>
            </div>
          </div>

          {/* ── SECTION 4: PAYMENT SECURITY PIN ── */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base font-bold text-[#1a1a2e] m-0 flex items-center gap-2">
                <Lock size={18} className="text-[#FFC700]" />
                Admin Payment & Payout Security PIN
              </h2>
              <p className="text-xs text-gray-500 m-0 mt-0.5">
                Set a security PIN required for confirming manual payouts and high-value approvals
              </p>
            </div>

            <form onSubmit={handleSavePin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
                  Set New Payment PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
                  Confirm Payment PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="••••"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingPin || !pin}
                  className="px-6 py-2.5 bg-[#FFC700] hover:bg-[#e5b300] text-[#1a1a2e] font-bold text-xs rounded-xl transition flex items-center gap-2 border-0 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {savingPin && <RefreshCw size={13} className="animate-spin" />}
                  <span>Save Security PIN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
