'use client';

import AdminLayout from '@/src/AdminScreenLayout/AdminLayout';
import Sidebar from '../../components/Sidebar';
import PaymentPIN from './components/PaymentPIN';

export default function PaymentSettingsPage() {
  return (
    <AdminLayout>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-8">
          <PaymentPIN />
        </div>
      </div>
    </AdminLayout>
  );
}
