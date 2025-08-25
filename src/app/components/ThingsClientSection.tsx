"use client";

import { ThingsListClient } from "./ThingsListClient";
import { AddThingClient } from "./AddThingClient";

export function ThingsClientSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Client-Side Approach</h2>
          <p className="text-gray-600">Data fetched and managed on the client with TanStack Query</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Thing Section */}
          <div>
            <AddThingClient />
          </div>

          {/* Things List Section */}
          <div>
            <ThingsListClient />
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Client-Side Benefits:</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Interactive UI with loading states</li>
            <li>• Automatic caching and background updates</li>
            <li>• Optimistic updates for better UX</li>
            <li>• Request deduplication</li>
            <li>• Error handling and retry logic</li>
            <li>• Real-time data synchronization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
