"use client";

import { useQuery } from "@tanstack/react-query";
import { Thing } from "@/lib/db/types";

interface ApiResponse {
  success: boolean;
  data: Thing[];
  error?: string;
}

async function fetchThings(): Promise<Thing[]> {
  const response = await fetch("/api/things");

  if (!response.ok) {
    throw new Error("Failed to fetch things");
  }

  const data: ApiResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch things");
  }

  return data.data;
}

export function ThingsListClient() {
  const {
    data: things = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["things"],
    queryFn: fetchThings,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Things List</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Things List</h2>
          <p className="text-red-600">Error loading things</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Things List</h2>
        <p className="text-gray-600">All items from the database (Client-side)</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Refresh
        </button>
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
