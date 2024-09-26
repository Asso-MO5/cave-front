'use client'
import { StretchBox } from '@/ui/StretchBox'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { StatusChip } from '@/ui/StatusChip'

export function Public() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  async function handleFetch() {
    setLoading(true)

    const ctrl = new AbortController()
    const params = new URLSearchParams(window.location.search)
    params.set('status', 'published')
    const url = `/items/public?${params.toString()}`

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
    searchParams.get('search'),
  ])

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] gap-2">
      <header className="flex gap-2 items-center justify-between w-full"></header>
      <StretchBox>
        <Table
          cols={[
            {
              name: 'Nom',
              key: 'name',
              sortable: true,
              searchable: true,
            },
            {
              name: 'Type',
              key: 'rType',

              component: ({ rowData }) => (
                <div>{ITEM_TYPE_TITLE[rowData.rType]}</div>
              ),
            },
          ]}
          data={data}
          loading={loading}
          totalCount={total}
          onRowClick={({ id }) => router.push(`/fiches/${id}`)}
        />
      </StretchBox>
    </div>
  )
}
