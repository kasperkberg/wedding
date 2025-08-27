"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, UserRole } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user as User | null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleRoleChange = async (newRole: UserRole) => {
    try {
      const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          newRole,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the session to get updated user data
        await authClient.getSession();
        // Force a page reload to reflect the role change
        window.location.reload();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error changing role:", error);
      alert("Failed to change role");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <p className="text-gray-600">Not signed in</p>
          <a
            href="/login"
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "guest":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Role:</span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(
              user.role
            )}`}
          >
            {user.role}
          </span>
        </div>

        {/* Role Management Section */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Change Role:
          </h4>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleRoleChange("guest")}
              disabled={user.role === "guest"}
              className={`px-3 py-1 text-xs font-medium rounded border ${
                user.role === "guest"
                  ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
              }`}
            >
              Set as Guest
            </button>

            <button
              onClick={() => handleRoleChange("admin")}
              disabled={user.role === "admin"}
              className={`px-3 py-1 text-xs font-medium rounded border ${
                user.role === "admin"
                  ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
              }`}
            >
              Set as Admin
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: This demo allows self-role changes. In production, role
            changes should be restricted to super admins only.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Role Permissions:
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            {user.role === "admin" ? (
              <>
                <p>✅ Can view and manage all things</p>
                <p>✅ Can add, edit, and delete things</p>
                <p>✅ Can manage user accounts</p>
                <p>✅ Can edit wedding information</p>
                <p>✅ Full administrative access</p>
              </>
            ) : (
              <>
                <p>✅ Can view things</p>
                <p>❌ Cannot add new things (server-side)</p>
                <p>✅ Can add things via client (demo)</p>
                <p>❌ Limited administrative access</p>
              </>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            {user.emailVerified && <p>✅ Email verified</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
