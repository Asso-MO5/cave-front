'use client'
import { useEffect } from 'react'

export function SetCookie({ name, value }) {
  useEffect(() => {
    document.cookie = `${name}=${value};`
  }, [name, value])

  return null
}
