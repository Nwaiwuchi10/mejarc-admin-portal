"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
      }
    }
  }, [router]);

  return <AdminDashboard />;
}