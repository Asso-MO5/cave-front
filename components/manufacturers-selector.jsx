'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { ChevronDownIcon } from '@/ui/icon/chevron-down'
import { dc } from '@/utils/dynamic-classes'
import { getCookie } from '@/utils/get-cookie'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]

export default function ManufacturersSelector({ defaultValue = '' }) {
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [selected, setSelected] = useState(defaultValue)

  const { data, fetchNextPage, isFetching, refetch } = useInfiniteQuery({
    queryKey: ['companies', debouncedQuery],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams()
      if (pageParam) searchParams.append('cursor', pageParam)
      searchParams.append('limit', 100)
      if (debouncedQuery) searchParams.append('name', debouncedQuery)

      searchParams.append('activities', 'manufacturer')
      const fetchedData = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/machines?${searchParams.toString()}`,
        {
          headers: {
            Authorization: 'Bearer ' + getCookie('api_token'),
          },
        }
      )

      return await fetchedData.json()
    },
    initialPageParam: '',
    getNextPageParam: ({ pagination }) => pagination.nextCursor,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  )

  const totalDBRowCount = data?.pages?.[0]?.pagination?.totalItems ?? 0
  const totalFetched = flatData.length

  const fetchMore = useCallback(() => {
    if (!isFetching && totalFetched < totalDBRowCount) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetching, totalFetched, totalDBRowCount])

  const rowVirtualizer = useVirtualizer({
    count: flatData?.length ?? 0,
    estimateSize: () => 32,
    getScrollElement: () => listRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  useEffect(() => {
    fetchMore()
  }, [fetchMore])

  const { mutate } = useMutation({
    queryKey: ['companies'],
    async mutationFn(name) {
      const form = new FormData()

      form.append('name', name)
      form.append('activities', 'manufacturer')
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/companies', {
        method: 'POST',
        body: form,
        headers: {
          Authorization: 'Bearer ' + getCookie('api_token'),
        },
      })
      return await res.json()
    },
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <Combobox value={selected} onChange={(value) => setSelected(value)}>
      <div className="relative">
        <ComboboxInput
          className={dc(
            'w-full rounded-sm border-none py-1.5 pr-8 pl-3 text-sm/6 ',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          displayValue={(person) => person?.name}
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
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const m = flatData[virtualRow.index]
          if (!m) return null
          return (
            <ComboboxOption
              key={m.id}
              value={m.name}
              className="group flex cursor-default items-center gap-2 rounded py-2 px-3 select-none data-[focus]:bg-white/10"
            >
              <div className="text-sm/6 ">{m.name}</div>
            </ComboboxOption>
          )
        })}
        {query && (
          <ComboboxOption
            value={query}
            className="group flex cursor-pointer items-center gap-2 rounded py-2 px-3 select-none data-[focus]:bg-white/10"
          >
            <div className="text-sm/6 " onClick={() => mutate(query)}>
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
