import { useEffect, useState } from 'react'

/**
 *
 * @param {*} value
 * @param {Number} delay
 * @returns
 */
export function useDebounce(value, delay) {
  // State
  const [debouncedValue, setDebouncedValue] = useState(value)

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
