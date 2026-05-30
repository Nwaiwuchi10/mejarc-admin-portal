'use client';

import Sidebar from '../../components/Sidebar';
import GeneralSettings from './components/GeneralSettings';
import Branding from './components/Branding';
import AdminLayout from '@/src/AdminScreenLayout/AdminLayout';

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="flex bg-gray-50 text-[#4a4a4a] min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-8 space-y-6">
          <GeneralSettings />
          <Branding />
        </div>
      </div>
    </AdminLayout>
  );
}
