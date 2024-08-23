export function getCookie(name) {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((c) => c.includes(name))
  if (!cookie) return null
  return cookie.split('=')[1]
}
