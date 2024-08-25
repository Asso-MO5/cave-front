import { API } from '../_api/api.js'

const getRoles = (path, method) => {
  return []
  return Object.keys(API).reduce((acc, key) => {
    if (API[key].path === path) {
      acc = API[key][method].roles
    }
    return acc
  }, [])
}

export function checkProfiles(session, path, method) {
  const routeRoles = getRoles(path, method)
  if (!routeRoles.length) return true
  const userRoles = session?.user?.roles.map((role) => role.name)
  return routeRoles.some((role) => userRoles.includes(role))
}
