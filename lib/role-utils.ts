import { UserRole } from "./auth-types";

export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    admin: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function isAdmin(userRole: UserRole): boolean {
  return userRole === "admin";
}

export function isGuest(userRole: UserRole): boolean {
  return userRole === "guest";
}


