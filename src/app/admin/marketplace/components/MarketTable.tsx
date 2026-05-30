"use client";

import { useState, useRef, useEffect } from "react";
import StatusBadge, { MarketStatus } from "./StatusBadge";
import { MoreHorizontal, User } from "lucide-react";

type Market = {
  id: string;
  title: string;
  agent: string;
  date: string;
  category: string;
  value: string;
  status: MarketStatus;
  type: "Building Plan" | "Product Design";
  avatar: string;
};

const marketData: Market[] = [
  // Building Plan
  {
    id: "MKT-001",
    title: "Eco Home Design",
    agent: "Sarah Johnson",
    date: "Feb 6, 2026",
    category: "Residential",
    value: "₦30,000,000",
    status: "Pending Approval",
    type: "Building Plan",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: "MKT-002",
    title: "Luxury Villa Layout",
    agent: "David Okoro",
    date: "Feb 28, 2026",
    category: "Commercial",
    value: "₦30,000,000",
    status: "Pending Approval",
    type: "Building Plan",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    id: "MKT-003",
    title: "Modern Office Space",
    agent: "Mei Chen",
    date: "Mar 3, 2026",
    category: "Hotel & Lodge",
    value: "₦30,000,000",
    status: "Approved",
    type: "Building Plan",
    avatar: "/avatars/avatar-3.jpg",
  },
  {
    id: "MKT-004",
    title: "Renovation Blueprint",
    agent: "Fatima Yusuf",
    date: "Mar 5, 2026",
    category: "Hotel & Lodge",
    value: "₦30,000,000",
    status: "Rejected",
    type: "Building Plan",
    avatar: "/avatars/avatar-4.jpg",
  },
  // Product Design
  {
    id: "MKT-005",
    title: "Modern Wooden Door",
    agent: "Sarah Johnson",
    date: "Mar 1, 2026",
    category: "Doors",
    value: "₦6,500,000",
    status: "Pending Approval",
    type: "Product Design",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: "MKT-006",
    title: "Modular Kitchen Set",
    agent: "David Okoro",
    date: "Feb 28, 2026",
    category: "Kitchen",
    value: "₦500,000",
    status: "Approved",
    type: "Product Design",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    id: "MKT-007",
    title: "Office Desk",
    agent: "Mei Chen",
    date: "Mar 3, 2026",
    category: "Furniture",
    value: "₦450,000",
    status: "Pending Approval",
    type: "Product Design",
    avatar: "/avatars/avatar-3.jpg",
  },
];

const actions = [
  "Approve",
  "Reject",
  "Request Change",
  "View Detail",
  "Notify Agent",
];

export default function MarketTable({
  activeTab,
  status,
}: {
  activeTab: string;
  status: string;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = marketData
    .filter((s) => s.type === activeTab)
    .filter((s) => (status === "All" ? true : s.status === status));

  const isProductDesign = activeTab === "Product Design";

//   return (
//     <div ref={wrapperRef} className="bg-white rounded-xl shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="grid grid-cols-9 bg-gray-900 text-white px-4 py-3 text-sm">
//         {isProductDesign ? (
//           <>
//             <User size={16} />
//             <p>Project ID</p>
//             <p>Product Name</p>
//             <p>Category</p>
//             <p>Agent Name</p>
//             <p>Submission Date</p>
//             <p>Value</p>
//             <p>Status</p>
//             <p></p>
//           </>
//         ) : (
//           <>
//             <User size={16} />
//             <p>Project ID</p>
//             <p>Project Title</p>
//             <p>Agent Name</p>
//             <p>Submission Date</p>
//             <p>Category</p>
//             <p>Value</p>
//             <p>Status</p>
//             <p></p>
//           </>
//         )}
//       </div>

//       {/* Rows */}
//       {filtered.map((s) => (
//         <div
//           key={s.id}
//           className="relative grid grid-cols-9 gap-x-4 px-4 py-4 border-t items-center text-sm"
//         >
//           {isProductDesign ? (
//             <>
//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
//                   <img
//                     src={s.avatar}
//                     alt={s.agent}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </div>
//               <p>{s.id}</p>
//               <p>{s.title}</p>
//               <p>{s.category}</p>
//               <p>{s.agent}</p>
//               <p>{s.date}</p>
//               <p>{s.value}</p>
//               <StatusBadge status={s.status} />
//             </>
//           ) : (
//             <>
//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
//                   <img
//                     src={s.avatar}
//                     alt={s.agent}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </div>
//               <p>{s.id}</p>
//               <p>{s.title}</p>
//               <p>{s.agent}</p>
//               <p>{s.date}</p>
//               <p>{s.category}</p>
//               <p>{s.value}</p>
//               <StatusBadge status={s.status} />
//             </>
//           )}
//           <div className="relative flex justify-center">
//             <button
//               onClick={() =>
//                 setOpenMenuId(openMenuId === s.id ? null : s.id)
//               }
//               className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300"
//               aria-label="Open row actions"
//             >
//               <MoreHorizontal size={18} />
//             </button>

//             {openMenuId === s.id && (
//               <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
//                 {actions.map((action) => (
//                   <button
//                     key={action}
//                     type="button"
//                     onClick={() => setOpenMenuId(null)}
//                     className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     {action}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

return (
  // <div
  //   ref={wrapperRef}
  //   className="w-full max-w-full overflow-x-auto xl:overflow-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm"
  // >
  <div
  ref={wrapperRef}
  className="w-full max-w-full overflow-x-auto overflow-y-visible rounded-[24px] border border-[#e6e8f2] bg-white shadow-sm"
>
    <table className="w-full text-left text-sm xl:min-w-[1100px]">
      
      {/* TABLE HEAD */}
      <thead className="bg-[#1a1a2e] text-white">
        <tr>
          <th className="px-4 py-4 whitespace-nowrap">
            <div className="flex justify-center">
              <User size={16} />
            </div>
          </th>

          {isProductDesign ? (
            <>
              <th className="px-4 py-4 whitespace-nowrap">Project ID</th>
              <th className="px-4 py-4 whitespace-nowrap">Product Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Category</th>
              <th className="px-4 py-4 whitespace-nowrap">Agent Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Submission Date</th>
              <th className="px-4 py-4 whitespace-nowrap">Value</th>
              <th className="px-4 py-4 whitespace-nowrap">Status</th>
              <th className="px-4 py-4 whitespace-nowrap"></th>
            </>
          ) : (
            <>
              <th className="px-4 py-4 whitespace-nowrap">Project ID</th>
              <th className="px-4 py-4 whitespace-nowrap">Project Title</th>
              <th className="px-4 py-4 whitespace-nowrap">Agent Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Submission Date</th>
              <th className="px-4 py-4 whitespace-nowrap">Category</th>
              <th className="px-4 py-4 whitespace-nowrap">Value</th>
              <th className="px-4 py-4 whitespace-nowrap">Status</th>
              <th className="px-4 py-4 whitespace-nowrap"></th>
            </>
          )}
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody className="overflow-visible">
        {filtered.map((s) => (
          <tr
            key={s.id}
            className="border-t border-gray-100 hover:bg-gray-50 relative"
          >
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={s.avatar}
                  alt={s.agent}
                  className="h-full w-full object-cover"
                />
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap font-medium text-[#1a1a2e]">
              {s.id}
            </td>

            <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
              {s.title}
            </td>

            {isProductDesign ? (
              <>
                <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
                  {s.category}
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
                  {s.agent}
                </td>
              </>
            ) : (
              <>
                <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
                  {s.agent}
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
                  {s.date}
                </td>
              </>
            )}

            {isProductDesign ? (
              <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
                {s.date}
              </td>
            ) : (
              <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
                {s.category}
              </td>
            )}

            <td className="px-4 py-4 whitespace-nowrap text-[#1a1a2e]">
              {isProductDesign ? s.value : s.value}
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <StatusBadge status={s.status} />
            </td>

            <td className="relative px-4 py-4 whitespace-nowrap">
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === s.id ? null : s.id)
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200"
                aria-label="Open row actions"
              >
                <MoreHorizontal size={18} />
              </button>

              {openMenuId === s.id && (
                <div className="absolute right-4 top-[70px] z-50 w-44 rounded-2xl border border-gray-200 bg-white py-2 shadow-2xl">
                  {actions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => setOpenMenuId(null)}
                      className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}