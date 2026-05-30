"use client";

import { useRouter } from "next/navigation";

export default function RecentMessages() {
  const router = useRouter();

  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          Just now
        </h3>

        <button
          onClick={() =>
            router.push("/admin/messages")
          }
          className="text-sm text-yellow-600 hover:underline"
        >
          View →
        </button>
      </div>

      {/* MESSAGE 1 */}
      <div className="flex items-start gap-3 min-w-0">

        <img
          src="https://i.pravatar.cc/40?img=1"
          className="h-10 w-10 shrink-0 rounded-full"
          alt="user"
        />

        <div className="min-w-0 flex-1">

          <p className="font-medium text-gray-900">
            Olamide James
          </p>

          <p className="truncate text-sm text-gray-500">
            Hello Admin, my project has been stuck in In-Progress...
          </p>

        </div>

        <span className="shrink-0 text-xs text-gray-400">
          2 hours ago
        </span>

      </div>

      {/* MESSAGE 2 */}
      <div className="flex items-start gap-3 min-w-0">

        <img
          src="https://i.pravatar.cc/40?img=2"
          className="h-10 w-10 shrink-0 rounded-full"
          alt="user"
        />

        <div className="min-w-0 flex-1">

          <p className="font-medium text-gray-900">
            Precious Samuel
          </p>

          <p className="truncate text-sm text-gray-500">
            I just wanted to share how impressed I am with the agent assigned...
          </p>

        </div>

        <span className="shrink-0 text-xs text-gray-400">
          2 hours ago
        </span>

      </div>

    </div>
  );
}
