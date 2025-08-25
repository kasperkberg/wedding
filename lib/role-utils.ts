import { UserRole } from "./auth-types";

export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    editor: 1,
    admin: 2,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function isAdmin(userRole: UserRole): boolean {
  return userRole === "admin";
}

export function isGuest(userRole: UserRole): boolean {
  return userRole === "guest";
}

export function isEditor(userRole: UserRole): boolean {
  return userRole === "editor";
}

export function canEditEvent(userRole: UserRole): boolean {
  return userRole === "editor" || userRole === "admin";
}

