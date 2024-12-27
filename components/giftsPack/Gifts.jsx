'use client'
import { StretchBox } from '@/ui/StretchBox'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { Modal } from './create/Modal'
import { StatusChip } from '@/ui/StatusChip'

export function Gifts() {
  const router = useRouter()
  const { id } = useParams()

  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  async function handleFetch() {
    setLoading(true)

    const ctrl = new AbortController()
    const params = new URLSearchParams(window.location.search)
    if (!params.get('limit')) params.set('limit', 50)
    const url = `/gifts_packs/${id}?${params.toString()}`

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
    searchParams.get('retailer'),
    searchParams.get('campain'),
    searchParams.get('type'),
    searchParams.get('status'),
  ])

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] gap-2">
      <header className="flex gap-2 items-center justify-between w-full">
        <h1>Pass</h1>
        <div className="flex  gap-2 items-center justify-end">
          <Modal onCreate={handleFetch} />
        </div>
      </header>
      <StretchBox>
        <Table
          onRowClick={(rowData) => router.push(`/gifts_packs/${rowData.id}`)}
          cols={[
            {
              name: 'status',
              key: 'status',
              sortable: true,
              size: 'small',
              component: ({ rowData }) => (
                <StatusChip status={rowData.status} />
              ),
            },
            {
              name: 'Nom',
              key: 'name',
            },

            {
              name: 'Prénom',
              key: 'lastname',
            },
            {
              name: 'Code Postal',
              key: 'zipCode',
            },

            {
              name: 'Année de naissance',
              key: 'birthdate',
            },
          ]}
          data={data}
          loading={loading}
          totalCount={total}
        />
      </StretchBox>
    </div>
  )
}
