'use client';

import AdminLayout from '@/src/AdminScreenLayout/AdminLayout';
import Sidebar from '../../components/Sidebar'
import Image from 'next/image';

import Card from './components/Card';
import Row from './components/Row';
import Section from './components/Section';
import SelectBox from './components/SelectBox';
import { PrimaryButton, SecondaryButton } from './components/ActionButton';

export default function BackupPage() {
  return (
    <AdminLayout>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-8 space-y-6">
          {/* Top Info */}
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/backup.png"
                  alt="Backup Icon"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              <div className="text-sm text-gray-700">
                <div>
                  <span className="font-medium">Last Backup:</span> 12 Jan 2026
                  – 02:15 AM
                </div>
                <div>
                  <span className="font-medium">Backup Size:</span> 932 MB
                </div>
              </div>
            </div>

            <PrimaryButton>Backup</PrimaryButton>
          </div>

          {/* Settings */}
          <Section title="Backup">
            <Card>
              <Row label="Auto Backup" right={<SelectBox value="Daily" />} />
              <Row
                label="Restore Backup"
                right={<SecondaryButton>Restore Backup</SecondaryButton>}
              />
            </Card>
          </Section>
        </div>
      </div>
    </AdminLayout>
  );
}
