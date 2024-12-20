'use client'
import { StretchBox } from '@/ui/StretchBox'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { ACTIVITIES_COMPANY } from '@/utils/constants'
import { StatusChip } from '@/ui/StatusChip'
import Link from 'next/link'

export function Companies() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  async function handleFetch() {
    setLoading(true)

    const ctrl = new AbortController()
    const params = new URLSearchParams(window.location.search)
    if (!params.get('limit')) params.set('limit', 50)
    const url = `/companies?${params.toString()}`

    const response = await fetcher.get(url, ctrl.signal)
    const { total, items } = await response.json()

    setData(items)
    setTotal(total)
    setLoading(false)
  }

  useEffect(() => {
    handleFetch({
      setLoading,
      setData,
      setTotal,
    })
  }, [
    searchParams.get('page'),
    searchParams.get('sort'),
    searchParams.get('order'),
    searchParams.get('name'),
    searchParams.get('type'),
    searchParams.get('status'),
    searchParams.get('place'),
    searchParams.get('limit'),
  ])

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] gap-2">
      <header className="flex gap-2 items-center justify-between w-full">
        <h1>Entreprises</h1>
        <div className="flex  gap-2 items-center justify-end"></div>
      </header>
      <StretchBox>
        <Table
          cols={[
            {
              name: 'Nom',
              key: 'name',
              sortable: true,
              searchable: true,
              component: ({ rowData }) => (
                <div className="w-full flex h-full items-center">
                  <Link href={`/admin/companies/${rowData.id}`}>
                    {rowData.name}
                  </Link>
                </div>
              ),
            },
            {
              name: 'Status',
              key: 'status',
              size: 'x-small',
              sortable: true,
              component: ({ rowData }) => {
                return <StatusChip status={rowData.status} />
              },
            },
            {
              name: 'Activités',
              key: 'types',
              component: ({ rowData }) => {
                return (
                  <div>
                    {rowData.types
                      .split(',')
                      .map((type) => ACTIVITIES_COMPANY?.[type])
                      .join(', ')}
                  </div>
                )
              },
            },
          ]}
          data={data}
          loading={loading}
          totalCount={total}
          onRowClick={({ id }) => router.push(`/admin/companies/${id}`)}
        />
      </StretchBox>
    </div>
  )
}
