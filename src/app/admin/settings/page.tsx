"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import AddressInfo from "./components/AddressInfo";
import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import { settingService } from "@/src/services/settingService";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const res = await settingService.getProfile();
    if (res) setProfile(res);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <ProfileHeader profile={profile} />
              <PersonalInfo profile={profile} onUpdate={fetchProfile} />
              <AddressInfo profile={profile} onUpdate={fetchProfile} />
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
