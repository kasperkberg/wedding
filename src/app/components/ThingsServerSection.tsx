import { getAllThings } from "@/lib/db/queries";
import { ThingsList } from "./ThingsList";
import { AddThingServer } from "./AddThingServer";

export async function ThingsServerSection() {
  const things = await getAllThings();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Server-Side Approach</h2>
          <p className="text-gray-600">Data fetched and rendered on the server</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Thing Section */}
          <div>
            <AddThingServer />
          </div>

          {/* Things List Section */}
          <div>
            <ThingsList things={things} />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Server-Side Benefits:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Fast initial page load</li>
            <li>• SEO friendly (content available in HTML)</li>
            <li>• No client-side JavaScript required for data</li>
            <li>• Automatic server-side caching</li>
            <li>• Reduced client bundle size</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
