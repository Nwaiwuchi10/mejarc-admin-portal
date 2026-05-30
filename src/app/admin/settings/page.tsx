'use client';

import Sidebar from './components/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfo from './components/PersonalInfo';
import AddressInfo from './components/AddressInfo';
import AdminLayout from '@/src/AdminScreenLayout/AdminLayout';

export default function ProfilePage() {
  return (
    <AdminLayout>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          <ProfileHeader />
          <PersonalInfo />
          <AddressInfo />
        </div>
      </div>
    </AdminLayout>
  );
}
