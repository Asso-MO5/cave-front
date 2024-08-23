import { useEffect, useState } from 'react'

export function useLocalState(key, defaultValue) {
  const KEY = `cave_mo5_${key}`
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(() => {
      const storedValue = localStorage.getItem(KEY)
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue
    })
  }, [])

  const handleSetValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(KEY, JSON.stringify(newValue))
  }

  return [value, handleSetValue]
}
