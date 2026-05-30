"use client";

import React from "react";
import StatCard from "./StatCard";

/* ── Data ──────────────────────────────────────────────────────────────── */
const stats = [
    { title: "Total Wallet Balance", value: "₦40,000,000", change: "5.2% Last week" },
    { title: "Active Agents", value: "17", change: "25.2% Last week" },
    { title: "Ongoing Projects", value: "42", change: "25.2% Last week" },
    { title: "Pending Projects", value: "4", change: "25.2% Last week" },
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function StatsRow() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => (
                <StatCard key={s.title} title={s.title} value={s.value} change={s.change} />
            ))}
        </div>
    );
}
