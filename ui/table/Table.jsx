import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { StretchBox } from '../StretchBox'
import { Pagination } from './Pagination'
import { Placeholder } from '../Placeholder'
import { DefaultCell } from './DefaultCell'
import { Virtuoso } from 'react-virtuoso'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '../icon/ChevronDownIcon'

export function Table(props) {
  const {
    data,
    cols,
    loading = false,
    noDataMessage,
    totalCount = 0,
    rowKey = 'id',
    pagination = true,
    onRowClick,
    onSort,
    onPaginate,
  } = props
  const searchParams = useParams()
  const page = Number(searchParams.page) || 1

  const [perPage, setPerPage] = useState(50)

  useEffect(() => {
    onPaginate?.(page, perPage)
  }, [page, perPage, onPaginate])

  useEffect(() => {
    setPerPage(parseInt(searchParams.limit || '50'))
  }, [searchParams.page, searchParams.limit])

  const columnTemplate = useMemo(() => {
    const colSizes = cols.map((col) => col.size || 'normal')
    return colSizes
      .map((size) => {
        switch (size) {
          case 'x-small':
            return 'minmax(0, .5fr)'
          case 'small':
            return 'minmax(0, 1fr)'
          case 'medium':
            return 'minmax(0, 1.3fr)'
          case 'intermediate':
            return 'minmax(0, 1.5fr)'
          case 'normal':
            return 'minmax(0, 3fr)'
          case 'large':
            return 'minmax(0, 5fr)'
          case 'x-large':
            return 'minmax(0, 6fr)'
        }
      })
      .join(' ')
  }, [cols])

  const startRange = (page - 1) * perPage + 1
  const endRange = Math.min(page * perPage, totalCount)

  const rows = loading ? Array.from({ length: 25 }) : data

  const handlePerPage = (value) => {
    setPerPage(parseInt(value || '50'))
    /*
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('limit', value)
      newParams.set('page', String(1))
      return newParams
    })
      */
  }

  return (
    <div className="w-full grid grid-rows-[1fr_auto] h-full overflow-hidden relative">
      <StretchBox>
        <div className="relative grid grid-rows-[auto_1fr] h-full overflow-x-auto">
          <nav
            className="grid gap-2 border-b border-mo-primary p-2 bg-mo-bg z-10"
            style={{ gridTemplateColumns: columnTemplate }}
          >
            {cols.map((col) => (
              <div
                key={`${col.key}-${col.order}`}
                onClick={() => {
                  if (!loading && col.sortable)
                    onSort?.(
                      typeof col.sortable === 'string' ? col.sortable : col.key
                    )
                }}
                className="cursor-pointer text-sm font-bold flex items-center gap-1 w-full"
              >
                {col.name}
                {col.sortable && (
                  <div
                    data-order={!!col.order?.match(/desc/i)}
                    className="transition origin-center data-[order=true]:rotate-180  data-[order=false]:rotate-0"
                  >
                    "&#x25B2;"
                  </div>
                )}
              </div>
            ))}
          </nav>

          <StretchBox>
            <section className="bg-mo-bg text-sm h-full w-full">
              <Virtuoso
                style={{ height: '100%', width: '100%' }}
                data={rows}
                totalCount={totalCount}
                itemContent={(index) => {
                  return (
                    <div
                      className="grid gap-2 px-2 py-3 cursor-pointer hover:bg-mo-tertiary odd:bg-black/5"
                      style={{ gridTemplateColumns: columnTemplate }}
                    >
                      {cols.map((col) => {
                        const row = data[index]
                        const key = `${row?.[rowKey] || index}-${col.key}`
                        const keys = col.key.split('.')
                        if (loading) return <Placeholder key={key} />

                        const value = keys.reduce((acc, key) => {
                          if (Array.isArray(acc)) {
                            return acc.map((item) => item?.[key])
                          }
                          return acc?.[key]
                        }, row)

                        if (col.component) {
                          const Comp = col.component
                          return (
                            <Comp
                              key={key}
                              data={value}
                              rowData={row}
                              onClick={() => onRowClick?.(row)}
                            />
                          )
                        }

                        if (Array.isArray(value)) {
                          return (
                            <div key={key}>
                              {value.length <= 1 ? (
                                <div onClick={() => onRowClick?.(row)}>
                                  <DefaultCell value={value[0] || '--'} />
                                </div>
                              ) : (
                                <Modal
                                  noControl
                                  content={
                                    <div className="flex flex-col gap-2 text-sm max-h-[70dvh] p-4 -m-4 overflow-y-auto">
                                      {value
                                        .sort((a, b) => a.localeCompare(b))
                                        .map((item, i) => (
                                          <div
                                            key={`${item}-${i}`}
                                            className="text-mo-text"
                                          >
                                            {item}
                                          </div>
                                        ))}
                                    </div>
                                  }
                                >
                                  <DefaultCell
                                    value={
                                      <span className="whitespace-nowrap">
                                        {value[0]}
                                        <span className="opacity-50">
                                          {'+'}
                                          {value.length - 1}
                                        </span>
                                      </span>
                                    }
                                  />
                                </Modal>
                              )}
                            </div>
                          )
                        }

                        if (
                          typeof value === 'string' ||
                          typeof value === 'number'
                        )
                          return (
                            <div key={key} onClick={() => onRowClick?.(row)}>
                              <DefaultCell value={value} />
                            </div>
                          )

                        return (
                          <span
                            onClick={() => onRowClick?.(row)}
                            className="h-full flex items-center"
                            key={key}
                          >
                            --
                          </span>
                        )
                      })}
                    </div>
                  )
                }}
              />

              {!data.length && !loading && (
                <div className="text-center p-4">
                  {noDataMessage || "Aucune donnée n'a été trouvée"}
                </div>
              )}
            </section>
          </StretchBox>
        </div>
      </StretchBox>

      {pagination && totalCount ? (
        <footer className="p-2 flex items-center justify-between w-full border-t border-mo-primary">
          <div className="flex items-center">
            <div className="text-xs whitespace-nowrap hidden md:block">
              Résultat par page
            </div>
            <Menu>
              <MenuButton className="rounded-sm px-2 py-1 text-sm/6 border border-primary font-bold uppercase flex items-center justify-between gap-2 ">
                {perPage}
                <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
              </MenuButton>
              <MenuItems
                anchor="bottom-right"
                className="mt-1 rounded-sm border border-mo-primary bg-mo-white z-50"
              >
                <div className="flex flex-col max-h-56 overflow-y-auto ">
                  {[25, 50, 100, 200]?.map((num) => (
                    <MenuItem key={num}>
                      <div
                        className="block data-[focus]:bg-mo-primary data-[focus]:text-mo-white w-full cursor-pointer p-1 text-cetner px-3"
                        onClick={() => handlePerPage(num)}
                      >
                        {num}
                      </div>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>

          <Pagination totalItems={totalCount} />

          <div className="text-xs text-mo-text">
            nb page: {totalCount}
            {' | '}
            <span className="opacity-50">
              Résultat de {startRange} à {endRange}
            </span>
          </div>
        </footer>
      ) : null}
    </div>
  )
}
