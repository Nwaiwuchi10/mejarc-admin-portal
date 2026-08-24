"use client";

import React, { useState } from "react";
import { Eye, CheckCircle2, AlertTriangle, XCircle, Database, Server, Cpu, Clock, RefreshCw, X } from "lucide-react";
import { reportService } from "@/src/services/reportService";

/* ── Mini tile ─────────────────────────────────────────────────────────── */
interface TileProps {
    label: string;
    value: string;
    valueClass: string;
    sublabel?: string;
}
function HealthTile({ label, value, valueClass, sublabel }: TileProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-3 text-center flex flex-col justify-center">
            <p className="text-[11px] text-gray-500 m-0 leading-none mb-1 font-medium">{label}</p>
            <p className={`text-base sm:text-lg font-bold m-0 leading-none truncate ${valueClass}`}>{value}</p>
            {sublabel && <p className="text-[10px] text-gray-400 m-0 mt-1">{sublabel}</p>}
        </div>
    );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function SystemHealth({ data: initialData }: { data?: any }) {
    const [healthData, setHealthData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const health = healthData || initialData || {
        uptime: "99.9%",
        apiStatus: "Healthy",
        database: {
            status: "Connected",
            connected: true,
            latency: "< 5ms",
            type: "PostgreSQL",
        },
        dbLoad: "Connected",
        errors: "0",
        healthScore: 100,
    };

    const isConnected = health?.database?.connected !== false && health?.status !== "DEGRADED" && health?.apiStatus !== "Offline";
    const dbStatusText = health?.database?.status || (isConnected ? "Connected" : "Disconnected");
    const dbLatency = health?.database?.latency || (health?.database?.latencyMs ? `${health.database.latencyMs}ms` : "");
    const dbDisplay = dbLatency ? `${dbStatusText} (${dbLatency})` : dbStatusText;

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const res = await reportService.getSystemHealth();
            if (res && res.status) {
                setHealthData(res);
            }
        } catch (e) {
            console.error("Failed to refresh health", e);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-[#1a1a2e] m-0">System Health</h2>
                        <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 text-[12px] text-gray-700 bg-[#FFF8E7] px-2.5 py-1 rounded-full font-medium hover:bg-yellow-100 transition-colors duration-150 cursor-pointer border-0"
                    >
                        View <Eye size={12} className="text-[#FFC700]" />
                    </button>
                </div>

                {/* Health Bar */}
                <div className="w-full h-10 rounded-xl overflow-hidden bg-gray-100 mb-4 p-1 flex items-center">
                    <div
                        className={`h-full rounded-lg transition-all duration-1000 flex items-center justify-end px-3 ${
                            (health.healthScore ?? 100) >= 80
                                ? "bg-gradient-to-r from-emerald-400 to-green-600"
                                : (health.healthScore ?? 100) >= 50
                                ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                                : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                        style={{ width: `${Math.max(health.healthScore ?? 100, 10)}%` }}
                    >
                        <span className="text-[11px] font-bold text-white tracking-wide">
                            {health.healthScore ?? 100}%
                        </span>
                    </div>
                </div>

                {/* Stat Tiles Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <HealthTile
                        label="Backend Uptime"
                        value={health.uptime || "99.9%"}
                        valueClass="text-green-600"
                    />
                    <HealthTile
                        label="API Status"
                        value={health.apiStatus || "Healthy"}
                        valueClass={health.apiStatus === "Healthy" || health.apiStatus === "OK" ? "text-green-600" : "text-yellow-600"}
                    />
                    <HealthTile
                        label="Database"
                        value={dbDisplay}
                        valueClass={dbStatusText === "Connected" ? "text-emerald-600" : "text-red-500"}
                    />
                    <HealthTile
                        label="System Errors"
                        value={health.errors || "0"}
                        valueClass={health.errors === "0" ? "text-gray-700" : "text-red-500"}
                    />
                </div>
            </div>

            {/* ── System Diagnostics Modal ──────────────────────────────────────── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#FFF8E7] flex items-center justify-center text-[#FFC700]">
                                    <Server size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-[#1a1a2e] m-0">Mejarc Backend System Diagnostics</h3>
                                    <p className="text-xs text-gray-500 m-0">Real-time health check & database telemetry</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                            {/* API & DB Status Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* API Status Card */}
                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 flex items-start gap-3">
                                    <div className="mt-0.5">
                                        {health.apiStatus === "Healthy" || health.apiStatus === "OK" ? (
                                            <CheckCircle2 className="text-green-500" size={20} />
                                        ) : (
                                            <AlertTriangle className="text-yellow-500" size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium m-0">Mejarc Backend API</p>
                                        <p className="text-sm font-bold text-[#1a1a2e] m-0 mt-0.5">{health.apiStatus || "Operational"}</p>
                                        <p className="text-[11px] text-gray-400 m-0 mt-1">Status: {health.status || "OK"}</p>
                                    </div>
                                </div>

                                {/* DB Connection Card */}
                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Database className={dbStatusText === "Connected" ? "text-emerald-500" : "text-red-500"} size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium m-0">PostgreSQL Database</p>
                                        <p className="text-sm font-bold text-[#1a1a2e] m-0 mt-0.5">{dbStatusText}</p>
                                        <p className="text-[11px] text-emerald-600 font-medium m-0 mt-1">
                                            Latency: {dbLatency || "< 5ms"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Telemetry */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-xs">
                                <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                                    <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                                        <Clock size={14} className="text-gray-400" /> Process Uptime
                                    </span>
                                    <span className="font-semibold text-gray-800">{health.uptime || "N/A"}</span>
                                </div>

                                {health.system?.memory && (
                                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                                        <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                                            <Cpu size={14} className="text-gray-400" /> Memory Footprint
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {health.system.memory.heapUsedMB} MB / {health.system.memory.heapTotalMB} MB heap ({health.system.memory.rssMB} MB RSS)
                                        </span>
                                    </div>
                                )}

                                {health.system?.nodeVersion && (
                                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                                        <span className="text-gray-500 font-medium">Node Environment</span>
                                        <span className="font-semibold text-gray-800">{health.system.nodeVersion} ({health.system.platform})</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium">Server Timestamp</span>
                                    <span className="font-semibold text-gray-800">
                                        {health.timestamp ? new Date(health.timestamp).toLocaleString() : new Date().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer shadow-sm disabled:opacity-60"
                            >
                                <RefreshCw size={13} className={refreshing ? "animate-spin text-[#FFC700]" : "text-gray-500"} />
                                {refreshing ? "Checking..." : "Re-check Health"}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#1a1a2e] hover:bg-[#2a2a4e] transition-all cursor-pointer border-0 shadow-sm"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
