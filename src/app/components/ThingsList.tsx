import { Thing } from "@/lib/db/types";

interface ThingsListProps {
  things: Thing[];
}

export function ThingsList({ things }: ThingsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Things List</h2>
        <p className="text-gray-600">All items from the database</p>
      </div>

      {things.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No things found in the database.</p>
          <p className="text-sm text-gray-400 mt-2">Add some things to see them here!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {things.map((thing) => (
            <div
              key={thing.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <span className="font-medium text-gray-900">{thing.title}</span>
                <span className="ml-2 text-sm text-gray-500">ID: {thing.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
