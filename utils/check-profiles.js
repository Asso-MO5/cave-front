export function checkProfiles(session, path, method) {
  const routeRoles = getRoles(path, method)
  if (!routeRoles.length) return true
  const userRoles = session?.user?.roles.map((role) => role.name)
  return routeRoles.some((role) => userRoles.includes(role))
}
