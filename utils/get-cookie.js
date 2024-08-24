'use client'
export function getCookie(name) {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((c) => c.includes(name))
  if (!cookie) return null
  return cookie.split('=')[1]
}
