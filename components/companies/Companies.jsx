'use client'
import { StretchBox } from '@/ui/StretchBox'

import { Modal as ModalCreate } from './create/Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { Checkbox } from '@/ui/Checkbox'
import { ACTIVITIES_COMPANY, ITEM_TYPE_TITLE } from '@/utils/constants'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { ExportBtn } from '../items/ExportBtn'
import { PrintSelector } from '../items/PrintSelector'
import { StatusChip } from '@/ui/StatusChip'

export function Companies() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedTotal, setSelectedTotal] = useState(false)

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll)
    data.forEach((item) => (item.selected = !selectedAll))
  }

  async function handleDelete({ id }) {
    const ctrl = new AbortController()
    const oldData = data
    setData(data.filter((item) => item.id !== id))
    try {
      await fetcher.delete(`/items/${id}`, ctrl.signal)
    } catch (e) {
      setData(oldData)
    }
  }

  async function handleFetch() {
    setLoading(true)

    const ctrl = new AbortController()
    const params = new URLSearchParams(window.location.search)
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
    searchParams.get('search'),
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
