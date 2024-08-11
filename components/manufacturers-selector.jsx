'use client'
import { ChevronDownIcon } from '@/ui/icon/chevron-down'
import { dc } from '@/utils/dynamic-classes'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'

import { useState } from 'react'

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]

export default function ManufacturersSelector({ defaultValue = '' }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(defaultValue)

  const handleFetch = async (query) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/manufacturers?name=' + query
      )
      const data = await res.json()
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreate = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/manufacturers',
        {
          method: 'POST',
          body: JSON.stringify({ name: query }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const filteredManufacturer =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox
      value={selected}
      onChange={(value) => setSelected(value)}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <ComboboxInput
          className={dc(
            'w-full rounded-sm border-none py-1.5 pr-8 pl-3 text-sm/6 ',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          displayValue={(person) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-mo-primary group-data-[hover]:fill-mo-primary" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={dc(
          'w-[var(--input-width)] rounded mt-1 border border-mo-primary bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {filteredManufacturer.map((m) => (
          <ComboboxOption
            key={m.id}
            value={m.name}
            className="group flex cursor-default items-center gap-2 rounded py-2 px-3 select-none data-[focus]:bg-white/10"
          >
            <div className="text-sm/6 ">{m.name}</div>
          </ComboboxOption>
        ))}
        {query && (
          <ComboboxOption
            value={query}
            className="group flex cursor-pointer items-center gap-2 rounded py-2 px-3 select-none data-[focus]:bg-white/10"
          >
            <div className="text-sm/6 " onClick={handleCreate}>
              Créer {'"'}
              {query}
              {'"'}
            </div>
          </ComboboxOption>
        )}
        dfc
      </ComboboxOptions>
    </Combobox>
  )
}
