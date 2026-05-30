type Role = {
  name: string;
  dept: string;
  users: number;
  permissions: string;
  date: string;
};

export default function RoleRow({ role }: { role: Role }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-0 px-5 py-4 text-sm items-center hover:bg-gray-50 transition">

      <p className="font-medium text-gray-900">{role.name}</p>

      <p className="text-gray-600">{role.dept}</p>

      <p className="text-gray-600">{role.users}</p>

      <p className="text-gray-600">{role.permissions}</p>

      <div>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
          {role.date}
        </span>
      </div>

      <div className="md:text-right">
        <button className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs hover:bg-black transition">
          View
        </button>
      </div>

    </div>
  );
}