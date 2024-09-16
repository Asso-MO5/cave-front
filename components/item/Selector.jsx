// ===== [[ FUNCTIONS ]] =====

import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { fetcher } from '@/utils/fetcher'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'

async function handleFetch({ type, search, setData, setLoading }) {
  setLoading(true)
  const ctrl = new AbortController()
  const searchParams = new URLSearchParams()
  searchParams.append('type', type)
  searchParams.append('search', search)
  const response = await fetcher.get(
    '/items?' + searchParams.toString(),
    ctrl.signal
  )

  const { items } = await response.json()
  setData(items)
  setLoading(false)
}

async function handleCreate({
  type,
  query,
  setCompanies,
  setSelected,
  onSelect,
}) {
  const res = await fetcher.post('/items', {
    body: JSON.stringify({
      name: query,
      type,
    }),
  })

  const resJson = await res.json()
  setSelected(resJson)
  onSelect?.(resJson)
  setCompanies((prev) => [...prev, resJson])
}

// ===== [[ COMPONENTS ]] =====

/**
 *
 * @description
 * ## Item Selector
 * Permet de selectioner un item par type ou d'en créer un nouveau
 *
 * @example <Selector type="company" onSelect={(type) => console.log(type)} />
 * @typedef {Object} DefaulValue
 * @property {String} value
 * @property {String} name
 *
 *
 * @see {@link DefaulValue} for more information.
 * @param {Object} props
 * @param {DefaulValue} props.defaultValue
 * @param {String} props.type 'company', 'item', 'cartel'
 * @param {Function} props.onSelect
 * @returns {JSX.Element}
 */
export function Selector({ type = 'company', onSelect, defaultValue }) {
  const listRef = useRef(null)
  const [_loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    handleFetch({ type, setData, setLoading, search: query })
  }, [query])

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value)
        if (typeof value !== 'string') onSelect?.(value)
      }}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <ComboboxInput
          className="w-full rounded-sm border-none py-1.5 pr-8 pl-3 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
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
        className="w-[var(--input-width)] rounded mt-1 border border-mo-primary bg-mo-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-[999]"
      >
        {data
          ?.filter(
            (item) =>
              item.name !== selected?.name &&
              item.name?.toLowerCase().includes(query.toLowerCase())
          )
          ?.map((item) => {
            return (
              <ComboboxOption
                key={item.id}
                value={item}
                className="group flex cursor-pointer items-center gap-2 rounded py-2 px-3  data-[focus]:bg-white/10 hover:text-mo-primary"
              >
                <div className="text-sm/6 ">{item.name}</div>
              </ComboboxOption>
            )
          })}
        {query && (
          <ComboboxOption
            value={query}
            className="group flex cursor-pointer items-center gap-2 rounded py-2 px-3 data-[focus]:bg-white/10 hover:text-mo-primary"
          >
            <div
              className="text-sm/6"
              onClick={() => {
                handleCreate({
                  type,
                  query,
                  setCompanies,
                  setSelected,
                  onSelect,
                })
              }}
            >
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
