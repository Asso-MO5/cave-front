'use client'
export function getCookie(name) {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((c) => c.includes(name))
  if (!cookie) return null
  return cookie.split('=')[1]
}

export function setCookie(name, value, days) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}
