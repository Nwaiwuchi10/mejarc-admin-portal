"use client";

import React from "react";
import StatCard from "./StatCard";

interface StatsRowProps {
  summary?: any;
}

export default function StatsRow({ summary }: StatsRowProps) {
    const stats = [
        { 
          title: "Total Revenue", 
          value: summary ? `₦${summary.totalRevenue?.toLocaleString()}` : "₦0", 
          change: "Total platform revenue" 
        },
        { 
          title: "Total Users", 
          value: summary?.totalUsers?.toString() || "0", 
          change: "Registered users" 
        },
        { 
          title: "Active Agents", 
          value: summary?.totalAgents?.toString() || "0", 
          change: "Verified agents" 
        },
        { 
          title: "Total Products", 
          value: summary?.totalProducts?.toString() || "0", 
          change: "Marketplace listings" 
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => (
                <StatCard key={s.title} title={s.title} value={s.value} change={s.change} />
            ))}
        </div>
    );
}
