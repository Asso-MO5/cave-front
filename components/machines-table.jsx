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

const fetchSize = 50

export function MachineTable() {
  const tableContainerRef = useRef(null)

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

  //react-query has a useInfiniteQuery hook that is perfect for this use case
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: [
      'machines',
      sorting, //refetch when sorting changes
    ],
    queryFn: async ({ pageParam }) => {
      const fetchedData = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/machines?cursor=${pageParam}&limit=${5}`
      ) //pretend api call

      return await fetchedData.json()
    },
    initialPageParam: '',
    getNextPageParam: ({ pagination }) => pagination.nextCursor,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  )

  const totalDBRowCount = data?.pages?.[0]?.pagination?.totalItems ?? 0
  const totalFetched = flatData.length

  /*
  useEffect(() => {
    if (hasNextPage) fetchNextPage()
  }, [hasNextPage])
  console.log('________', data, totalDBRowCount)
  */

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
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

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
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

  //scroll to top of table when sorting changes
  const handleSortingChange = (updater) => {
    setSorting(updater)
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0)
    }
  }

  //since this table option is derived from table row model state, we're using the table.setOptions utility
  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }))

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
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
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
        <table className="grid w-full">
          <thead className="sticky top-0 z-10 grid">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.column.columnDef.width || 'auto' }} // Appliquez la largeur ici
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
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: 'relative', //needed for absolute positioning of rows
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index]
              return (
                <tr
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  key={row.id}
                  className="flex w-full absolute"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize || 'auto' }} // Appliquez la largeur ici
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
      {isFetching && <div>Fetching More...</div>}
    </div>
  )
}
