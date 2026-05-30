import RoleRow from "./RoleRow";

type Role = {
  name: string;
  dept: string;
  users: number;
  permissions: string;
  date: string;
};

export default function RolesTable({ roles }: { roles: Role[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="hidden md:grid grid-cols-6 bg-gray-900 text-white text-sm px-5 py-3">
        <p>Role Name</p>
        <p>Department</p>
        <p>Users Assigned</p>
        <p>Key Permissions</p>
        <p>Created Date</p>
        <p className="text-right">Action</p>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {roles.map((role, index) => (
          <RoleRow key={index} role={role} />
        ))}
      </div>
    </div>
  );
}