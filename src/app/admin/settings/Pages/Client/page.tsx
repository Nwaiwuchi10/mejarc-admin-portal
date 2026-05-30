'use client';

import AdminLayout from '@/src/AdminScreenLayout/AdminLayout';
import Sidebar from '../../components/Sidebar';
import ClientSettings from './components/ClientSettings';
import CommunicationRules from './components/CommunicationRules';

export default function ClientsPage() {
  return (
    <AdminLayout>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-8 space-y-6">
          <ClientSettings />
          <CommunicationRules />
        </div>
      </div>
    </AdminLayout>
  );
}
