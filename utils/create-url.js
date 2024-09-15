export function createUrl(url, params) {
  return url.replace(/{([^}]+)}/g, (_, key) => params[key])
}
