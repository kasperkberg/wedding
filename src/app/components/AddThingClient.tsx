"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Thing } from "@/lib/db/types";

interface ApiResponse {
  success: boolean;
  data: Thing;
  error?: string;
}

async function addThingToAPI(title: string): Promise<Thing> {
  const response = await fetch("/api/things", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add thing");
  }

  const data: ApiResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to add thing");
  }

  return data.data;
}

export function AddThingClient() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addThingToAPI,
    onSuccess: () => {
      // Invalidate and refetch the things query
      queryClient.invalidateQueries({ queryKey: ["things"] });
      setTitle("");
    },
    onError: (error) => {
      console.error("Error adding thing:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    mutation.mutate(title.trim());
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client-title" className="block text-sm font-medium text-gray-700 mb-1">
            Add New Thing (Client)
          </label>
          <input
            id="client-title"
            type="text"
            placeholder="Enter thing title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={mutation.isPending}
            required
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending || !title.trim()}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Adding..." : "Add Thing (Client)"}
        </button>
      </form>

      {mutation.isError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          Error: {mutation.error.message}
        </div>
      )}

      {mutation.isSuccess && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          Thing added successfully!
        </div>
      )}
    </div>
  );
}
