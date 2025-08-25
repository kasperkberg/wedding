import { useQuery } from "@tanstack/react-query";
import { Thing } from "../db/types";

interface ApiResponse {
  success: boolean;
  data: Thing[];
  error?: string;
}

// API function to fetch things
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

// React Query hook for fetching things
export function useThings() {
  return useQuery({
    queryKey: ["things"],
    queryFn: fetchThings,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Alternative: Create a custom hook that can be used in any component
export function useThingsData() {
  const { data: things = [], ...queryState } = useThings();

  return {
    things,
    ...queryState,
  };
}
