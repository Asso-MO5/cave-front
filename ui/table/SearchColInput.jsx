import { useDebounce } from '@/hooks/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function SearchColInput({ name, getKey, searchable }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get(getKey) || '')
  const [init, setInit] = useState(false)
  const debounceSearch = useDebounce(value, 500)

  const handleChange = () => {
    const newParams = new URLSearchParams(window.location.search)
    if (!value && !!newParams.get(getKey)) newParams.delete(getKey)
    else newParams.set(getKey, debounceSearch)

    router.push(`${window.location.pathname}?${newParams.toString()}`)
  }

  useEffect(() => {
    if (init) handleChange()
  }, [debounceSearch])

  return (
    <div className="w-full flex">
      <input
        name="sort"
        className="disabled:cursor-text disabled:opacity-100 bg-transparent border-none text-mo-text w-full placeholder:text-mo-primary"
        disabled={!searchable}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setInit(true)
        }}
        placeholder={name}
      />
    </div>
  )
}
