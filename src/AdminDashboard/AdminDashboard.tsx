"use client";

import React, { useState, useEffect } from "react";
import StatsRow from "./components/StatsRow";
import UsersManagement from "./components/UsersManagement";
import PaymentRequest from "./components/PaymentRequest";
import PlatformPerformance from "./components/PlatformPerformance";
import Notifications from "./components/Notifications";
import SystemHealth from "./components/SystemHealth";
import AdminLayout from "../AdminScreenLayout/AdminLayout";
import { reportService } from "../services/reportService";
import { userService } from "../services/userService";
import { financialService } from "../services/financialService";
import { communicationService } from "../services/communicationService";

export default function AdminDashboard() {
    const [data, setData] = useState({
        summary: null,
        users: null,
        transactions: null,
        performance: null,
        conversations: null,
        health: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [summary, users, transactions, performance, conversations, health] = await Promise.all([
                reportService.getSummary(),
                userService.getUsers({ limit: 10 }),
                financialService.getTransactions({ limit: 5 }),
                reportService.getPerformance(),
                communicationService.getConversations({ limit: 5 }),
                reportService.getSystemHealth(),
            ]);

            setData({
                summary,
                users,
                transactions,
                performance,
                conversations,
                health,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col gap-5 w-full">
                {/* ── Row 1: Statistics Cards ─────────────────────────────────── */}
                <StatsRow summary={data.summary} />

                {/* ── Row 2: Mid Panels ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <UsersManagement data={data.users} />
                    <PaymentRequest data={data.transactions} />
                    <PlatformPerformance data={data.performance} />
                </div>

                {/* ── Row 3: Bottom Panels ────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Notifications spans 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <Notifications data={data.conversations} />
                    </div>
                    <SystemHealth data={data.health} />
                </div>
            </div>
            
            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] z-[999] flex items-center justify-center pointer-events-none">
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#FFC700] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium text-gray-600">Syncing platform data...</span>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
