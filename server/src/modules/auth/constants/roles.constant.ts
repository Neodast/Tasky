export const matchRoles = (roles, userRoles) => {
  return roles.some((role) => role === userRoles);
};
