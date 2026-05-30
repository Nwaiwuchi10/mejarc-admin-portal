'use client';

import AdminLayout from '@/src/AdminScreenLayout/AdminLayout';
import Sidebar from '../../components/Sidebar';
import SecuritySettings from './components/SecuritySettings';

export default function SecurityPage() {
  return (
    <AdminLayout>
      <div className="flex text-[#4a4a4a] bg-gray-50 min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-8">
          <SecuritySettings />
        </div>
      </div>
    </AdminLayout>
  );
}
