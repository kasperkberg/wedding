"use server";

import { createThing } from "@/lib/db/queries";
import { isAdmin } from "../../../lib/role-utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { UserRole } from "../../../lib/auth-types";

export async function AddThingServer({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  // Check user session and role
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userRole = (session?.user?.role as UserRole) || "guest";
  const canAddThings = isAdmin(userRole);
  async function addThing(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;

    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }

    try {
      await createThing(title.trim());

      // Revalidate the demo page to show the new thing
      revalidatePath("/demo");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Database error creating thing:", error);
      throw new Error("Failed to create thing in database");
    }
  }

  if (!canAddThings) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <span className="text-yellow-800 font-medium">
              Access Restricted
            </span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            Only administrators can add things via server actions. Your current
            role: <strong>{userRole}</strong>
          </p>
          <p className="text-yellow-600 text-xs mt-2">
            Try the client-side form below - guests can add things through the
            API!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form action={addThing} className="space-y-4">
        <div>
          <label
            htmlFor="server-title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add New Thing (Server)
          </label>
          <input
            id="server-title"
            name="title"
            type="text"
            placeholder="Enter thing title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Thing (Server Action)
        </button>
      </form>

      <div className="text-sm text-gray-600">
        <p>
          <strong>How it works:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>Form submits to server action</li>
          <li>Data saved to database</li>
          <li>Page cache invalidated</li>
          <li>Page refreshes with new data</li>
          <li>
            <strong>Admin only:</strong> Requires administrator role
          </li>
        </ul>
      </div>
    </div>
  );
}
