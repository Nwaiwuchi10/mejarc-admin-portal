// "use client";

// import { useEffect, useRef, useState } from "react";
// import { MoreHorizontal } from "lucide-react";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status: "Active" | "Pending" | "Disabled";
//   userType: string;
//   verification: "Verified" | "Pending" | "Failed";
//   lastLogin: string;
//   avatar?: string;
// };

// interface UserTableProps {
//   users: User[];
// }

// const verificationColors = {
//   Verified: "bg-blue-100 text-blue-700",
//   Pending: "bg-yellow-100 text-yellow-700",
//   Failed: "bg-gray-700 text-white",
// };

// const statusColors = {
//   Active: "bg-green-500 text-white",
//   Pending: "bg-yellow-500 text-white",
//   Disabled: "bg-red-500 text-white",
// };

// export default function UserTable({ users }: UserTableProps) {
//   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         openDropdownId !== null &&
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setOpenDropdownId(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [openDropdownId]);

//   const handleAction = (action: string, userId: number) => {
//     console.log(`${action} for user ${userId}`);
//     setOpenDropdownId(null);
//   };

//   return (
//     <div ref={wrapperRef} className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-gray-900 text-white">
//           <tr>
//             <th className="px-6 py-4 font-medium">
//               <div className="flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <span>👤</span> Name
//                 </span>
//                 <span className="text-xs cursor-pointer">↕</span>
//               </div>
//             </th>
//             <th className="px-6 py-4 font-medium">
//               <div className="flex items-center justify-between">
//                 <span>User Type</span>
//                 <span className="text-xs cursor-pointer">↕</span>
//               </div>
//             </th>
//             <th className="px-6 py-4 font-medium">
//               <div className="flex items-center justify-between">
//                 <span>Verification Status</span>
//                 <span className="text-xs cursor-pointer">↕</span>
//               </div>
//             </th>
//             <th className="px-6 py-4 font-medium">
//               <div className="flex items-center justify-between">
//                 <span>Status</span>
//                 <span className="text-xs cursor-pointer">↕</span>
//               </div>
//             </th>
//             <th className="px-6 py-4 font-medium">
//               <div className="flex items-center justify-between">
//                 <span>Last Login</span>
//                 <span className="text-xs cursor-pointer">↕</span>
//               </div>
//             </th>
//             <th className="px-6 py-4 font-medium">
//               <div className="flex items-center justify-between">
//                 <span>Action</span>
//                 <span className="text-xs cursor-pointer">↕</span>
//               </div>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                       {user.name.charAt(0)}
//                     </div>
//                     <span className="font-medium text-[#1a1a2e]">{user.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-[#1a1a2e]">{user.userType}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//                       verificationColors[user.verification as keyof typeof verificationColors]
//                     }`}
//                   >
//                     {user.verification}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//                       statusColors[user.status as keyof typeof statusColors]
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-[#1a1a2e]">{user.lastLogin}</td>
//                 <td className="px-6 py-4 relative">
//                   <button
//                     onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
//                     className="p-2 rounded-full text-gray-600 hover:bg-gray-300 transition"
//                   >
//                     <MoreHorizontal size={18} />
//                   </button>
//                   {openDropdownId === user.id && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                       <ul className="py-1">
//                         <li>
//                           <button
//                             onClick={() => handleAction("View Profile", user.id)}
//                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             View Profile
//                           </button>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => handleAction("Message User", user.id)}
//                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             Message User
//                           </button>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => handleAction("Suspend Account", user.id)}
//                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             Suspend Account
//                           </button>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => handleAction("Activate Account", user.id)}
//                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             Activate Account
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Disabled";
  userType: string;
  verification: "Verified" | "Pending" | "Failed";
  lastLogin: string;
  avatar?: string;
};

interface UserTableProps {
  users: User[];
}

const verificationColors = {
  Verified: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-gray-700 text-white",
};

const statusColors = {
  Active: "bg-green-500 text-white",
  Pending: "bg-yellow-500 text-white",
  Disabled: "bg-red-500 text-white",
};

export default function UserTable({ users }: UserTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId !== null &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  const handleAction = (action: string, userId: number) => {
    console.log(`${action} for user ${userId}`);
    setOpenDropdownId(null);
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full rounded-xl border border-[#e6e8f2] bg-white"
    >
      <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-[13px] md:text-sm">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-4 py-3 md:px-6 md:py-4 font-medium">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>👤</span> Name
                </span>
                <span className="text-xs cursor-pointer">↕</span>
              </div>
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-medium">
              <div className="flex items-center justify-between">
                <span>User Type</span>
                <span className="text-xs cursor-pointer">↕</span>
              </div>
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-medium">
              <div className="flex items-center justify-between">
                <span>Verification Status</span>
                <span className="text-xs cursor-pointer">↕</span>
              </div>
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-medium">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="text-xs cursor-pointer">↕</span>
              </div>
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-medium">
              <div className="flex items-center justify-between">
                <span>Last Login</span>
                <span className="text-xs cursor-pointer">↕</span>
              </div>
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-medium">
              <div className="flex items-center justify-between">
                <span>Action</span>
                <span className="text-xs cursor-pointer">↕</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-3 md:px-6 md:py-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-[#1a1a2e]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 text-[#1a1a2e]">{user.userType}</td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      verificationColors[user.verification as keyof typeof verificationColors]
                    }`}
                  >
                    {user.verification}
                  </span>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColors[user.status as keyof typeof statusColors]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 text-[#1a1a2e]">{user.lastLogin}</td>
                <td className="px-4 py-3 md:px-6 md:py-4 relative">
                  <button
                    onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-300 transition"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {openDropdownId === user.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() => handleAction("View Profile", user.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleAction("Message User", user.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Message User
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleAction("Suspend Account", user.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Suspend Account
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleAction("Activate Account", user.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Activate Account
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}