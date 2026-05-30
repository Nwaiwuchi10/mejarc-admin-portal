"use client";

import React from "react";
import StatsRow from "./components/StatsRow";
import UsersManagement from "./components/UsersManagement";
import PaymentRequest from "./components/PaymentRequest";
import PlatformPerformance from "./components/PlatformPerformance";
import Notifications from "./components/Notifications";
import SystemHealth from "./components/SystemHealth";
import AdminLayout from "../AdminScreenLayout/AdminLayout";

/**
 * AdminDashboard
 * Main overview page — assembles all dashboard section components.
 *
 * Layout (responsive):
 *   Row 1 — 4 stat cards
 *   Row 2 — Users Management | Payment Request | Platform Performance
 *   Row 3 — Notifications (2/3 width) | System Health (1/3 width)
 */
export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-5 w-full">
                {/* ── Row 1: Statistics Cards ─────────────────────────────────── */}
                <StatsRow />

                {/* ── Row 2: Mid Panels ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <UsersManagement />
                    <PaymentRequest />
                    <PlatformPerformance />
                </div>

                {/* ── Row 3: Bottom Panels ────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Notifications spans 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <Notifications />
                    </div>
                    <SystemHealth />
                </div>
            </div>
        </AdminLayout>
    );
}
