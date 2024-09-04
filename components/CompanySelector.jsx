'use client'

import { GetCompaniesLightService } from '@/_api/GetCompaniesLightService.mjs'
import { GetGameSlugService } from '@/_api/GetGameSlugService'
import { PostCompaniesService } from '@/_api/PostCompaniesService.mjs'
import { useApi } from '@/hooks/useApi'
import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { dc } from '@/utils/dynamic-classes'

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'

import { useEffect, useRef, useState } from 'react'
import { useSession } from './SessionProvider'

const te = new GetGameSlugService()
te.verb

const postCompaniesService = new PostCompaniesService()
export function CompanySelector({
  defaultValue = {
    id: '',
    name: '',
  },
  onSelect,
  type = 'manufacturer',
}) {
  const { apiContext } = useSession()
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const [companies, setCompanies] = useState([])
  const [selected, setSelected] = useState(defaultValue)

  const { data, refetch } = useApi(GetCompaniesLightService, {
    query: {
      limit: 100000,
      activities: type,
    },
  })

  const handleCreate = async () => {
    const res = await postCompaniesService.execute({
      body: {
        name: query,
        activities: type,
      },
      context: apiContext,
    })

    setSelected(res)
    onSelect?.(res)
    setCompanies((prev) => [...prev, res])
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
          'w-[var(--input-width)] rounded mt-1 border border-mo-primary bg-mo-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-[999]'
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
