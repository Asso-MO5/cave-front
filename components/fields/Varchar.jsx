import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'

export function Varchar({
  defaultValue,
  update,
  placeholder,
  type = 'text',
  disabled,
}) {
  const [init, setInit] = useState(false)
  const [value, setValue] = useState(defaultValue || '')
  const debouncedUpdate = useDebounce(value, 500)

  useEffect(() => {
    if (!init) return
    if (debouncedUpdate !== defaultValue) {
      const fixVal = value?.trim()
      try {
        update(fixVal)
      } catch (e) {
        setValue(defaultValue)
      }
    }
  }, [debouncedUpdate])

  return (
    <input
      disabled={disabled}
      value={value}
      type={type}
      title={disabled ? 'Non modifiable' : ''}
      placeholder={placeholder}
      onChange={(e) => {
        setInit(true)
        setValue(e.target.value)
      }}
      className="bg-transparent border-0 border-b border-b-transparent  focus:border-b-blue-500 w-full disabled:opacity-100"
    />
  )
}
