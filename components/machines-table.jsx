'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { EditorRead } from './editor-read'
import { useRouter } from 'next/navigation'

export function MachineTable({ session }) {
  const tableContainerRef = useRef(null)
  const { push } = useRouter()

  const [sorting, setSorting] = useState([])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        cell: (info) => <span className=" truncate ">{info.getValue()}</span>,
      },
      {
        accessorFn: (row) => row.description,
        width: 300,
        id: 'description',
        cell: (info) => (
          <div className="w-full h-full overflow-y-auto truncate">
            <EditorRead value={info.getValue()} inText />
          </div>
        ),
      },
    ],
    []
  )

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ['machines', sorting],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams()
      if (pageParam) searchParams.append('cursor', pageParam)
      searchParams.append('limit', 100)
      const fetchedData = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/machines?${searchParams.toString()}`,
        {
          headers: {
            Authorization: 'Bearer ' + session.api_token,
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

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  )

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: false,
    columnResizeMode: 'flex',
  })

  const handleSortingChange = (updater) => {
    setSorting(updater)
    if (!!table.getRowModel().rows.length) rowVirtualizer.scrollToIndex?.(0)
  }

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }))

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 32,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  if (isLoading)
    return <div className="flex items-center justify-center">Chargement...</div>

  return (
    <div>
      <div
        className="container overflow-auto relative h-full"
        onScroll={(e) => fetchMoreOnBottomReached(e.target)}
        ref={tableContainerRef}
      >
        <table className="grid w-full">
          <thead className="sticky top-0 z-10 grid">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.column.columnDef.width || 'auto' }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody
            className="grid relative "
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index]
              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  className="flex w-full absolute even:bg-black/5 hover:bg-mo-primary hover:text-mo-bg cursor-pointer"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => push(`/admin/machine/${row.original.slug}`)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="p-1"
                        style={{ width: cell.column.getSize() || 'auto' }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {isFetching && <div>Chargement...</div>}
    </div>
  )
}
