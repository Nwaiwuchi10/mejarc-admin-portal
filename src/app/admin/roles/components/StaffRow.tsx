type Staff = {
  name: string;
  role: string;
  dept: string;
  email: string;
  status: string;
  lastLogin: string;
};

export default function StaffRow({ staff }: { staff: Staff }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3 md:gap-0 px-5 py-4 text-sm items-center hover:bg-gray-50 transition">

      {/* Name */}
      <p className="font-medium text-gray-900">{staff.name}</p>

      {/* Role */}
      <p className="text-gray-600">{staff.role}</p>

      {/* Department */}
      <p className="text-gray-600">{staff.dept}</p>

      {/* Email */}
      <a
        href={`mailto:${staff.email}`}
        className="text-blue-600 hover:underline break-all"
      >
        {staff.email}
      </a>

      {/* Status */}
      <div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
          {staff.status}
        </span>
      </div>

      {/* Last Login */}
      <div>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
          {staff.lastLogin}
        </span>
      </div>

      {/* Action */}
      <div className="md:text-right">
        <button className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs hover:bg-black transition">
          Remove
        </button>
      </div>

    </div>
  );
}