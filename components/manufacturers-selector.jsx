'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import { ChevronDownIcon } from '@/ui/icon/chevron-down'
import { dc } from '@/utils/dynamic-classes'

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'

import { useEffect, useRef, useState } from 'react'

export default function ManufacturersSelector({
  defaultValue = {
    id: '',
    name: '',
  },
  onSelect,
}) {
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [companies, setCompanies] = useState([])
  const [selected, setSelected] = useState(defaultValue)

  const { data, refetch } = useFetch({
    url: '/companies/light',

    params: {
      limit: 100000,
      activities: 'manufacturer',
      light: true,
      name: debouncedQuery,
    },
  })

  const { refetch: mutation, data: dataMutation } = useFetch({
    url: '/companies',
    method: 'post',
    enabled: false,
  })

  const handleCreate = async () => {
    const form = new FormData()
    form.append('name', query)
    form.append('activities', 'manufacturer')
    await mutation(form)
    setQuery('')
    refetch()
  }

  useEffect(() => {
    if (data) {
      setCompanies((prev) =>
        [...prev, ...data].reduce((acc, company) => {
          if (Array.isArray(company)) return acc
          if (!acc.find((c) => c.id === company.id)) {
            acc.push(company)
          }
          return acc
        }, [])
      )
    }
  }, [data])

  useEffect(() => {
    if (dataMutation?.id) {
      setSelected(dataMutation)
      setCompanies((prev) => [...prev, dataMutation])
    }
  }, [dataMutation])

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value)
        onSelect?.(value)
      }}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <ComboboxInput
          className={dc(
            'w-full rounded-sm border-none py-1.5 pr-8 pl-3 text-sm/6 ',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          displayValue={(company) => company?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton
          className="group absolute inset-y-0 right-0 px-2.5 z-50"
          as="button"
        >
          <ChevronDownIcon className="size-4 fill-mo-primary group-data-[hover]:fill-mo-primary" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        as="div"
        ref={listRef}
        anchor="bottom"
        transition
        className={dc(
          'w-[var(--input-width)] rounded mt-1 border border-mo-primary bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {companies
          ?.filter((c) => c.name !== selected?.name)
          ?.map((company) => {
            return (
              <ComboboxOption
                key={company.id}
                value={company}
                className={dc(
                  'group flex cursor-pointer items-center gap-2 rounded py-2 px-3  data-[focus]:bg-white/10 hover:text-mo-primary'
                )}
              >
                <div className="text-sm/6 ">{company.name}</div>
              </ComboboxOption>
            )
          })}
        {query && (
          <ComboboxOption
            value={query}
            className="group flex cursor-pointer items-center gap-2 rounded py-2 px-3 data-[focus]:bg-white/10 hover:text-mo-primary"
          >
            <div className="text-sm/6" onClick={handleCreate}>
              Créer {'"'}
              {query}
              {'"'}
            </div>
          </ComboboxOption>
        )}
      </ComboboxOptions>
    </Combobox>
  )
}