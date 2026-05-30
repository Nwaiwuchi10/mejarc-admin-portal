"use client";

type Role = "Super Admin" | "Project Manager" | "Finance Manager" | "Support Manager";

const permissions = [
  "View Users",
  "Edit Users",
  "Assign Agents",
  "Manage Projects",
  "Approve Refunds",
  "Process Payouts",
  "Access Reports",
];

const roles: Role[] = [
  "Super Admin",
  "Project Manager",
  "Finance Manager",
  "Support Manager",
];

const matrix: Record<Role, number[]> = {
  "Super Admin": [1, 1, 1, 1, 1, 1, 1],
  "Project Manager": [1, 1, 1, 1, 0, 0, 1],
  "Finance Manager": [1, 0, 0, 0, 1, 1, 1],
  "Support Manager": [1, 0, 0, 0, 1, 0, 1],
};

export default function PermissionMatrix() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        
        {/* ===== HEADER ===== */}
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="text-left px-6 py-4 font-medium">
              Permission
            </th>
            {roles.map((role) => (
              <th key={role} className="text-center px-6 py-4 font-medium">
                {role}
              </th>
            ))}
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {permissions.map((perm, i) => (
            <tr
              key={perm}
              className="border-t border-gray-100"
            >
              {/* Permission Name */}
              <td className="px-6 py-4 text-gray-700">
                {perm}
              </td>

              {/* Role Permissions */}
              {roles.map((role) => {
                const allowed = matrix[role][i];

                return (
                  <td
                    key={role}
                    className="text-center px-6 py-4"
                  >
                    {allowed ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-white text-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">
                        ✕
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}