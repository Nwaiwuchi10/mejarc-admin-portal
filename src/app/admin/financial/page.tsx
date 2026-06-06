import AdminLayout from "@/src/AdminScreenLayout/AdminLayout";
import FinancialReports from "./components/FinancialReports";

export default function FinancialReportsPage() {
  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="p-4 md:p-6">
          <FinancialReports />
        </div>
      </div>
    </AdminLayout>
  );
}
