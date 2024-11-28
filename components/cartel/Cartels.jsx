'use client'
import { StretchBox } from '@/ui/StretchBox'

import { Modal as ModalCreate } from './create/Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { Checkbox } from '@/ui/Checkbox'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { PrintSelector } from '../items/PrintSelector'
import { StatusChip } from '@/ui/StatusChip'
import { ImportBtn } from '../items/ImportBtn'
import Link from 'next/link'

export function Cartels() {
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

    if (!params.get('limit')) params.set('limit', 50)

    const url = `/items?itemType=cartel&${params.toString()}`
    const response = await fetcher.get(url, ctrl.signal)
    const { total, items } = await response.json()

    window.localStorage.setItem('cartelSearchParams', params.toString())
    setData(items)
    setTotal(total)
    setLoading(false)
  }

  useEffect(() => {
    handleFetch()
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
        <h1>Cartels</h1>
        <div className="text-sm flex flex-wrap gap-2 items-center justify-end">
          <Checkbox
            label={`Tout selectionner (${total})`}
            onCheck={(checked) => {
              setSelectedTotal(checked)
              handleSelectAll(checked)
            }}
            checked={selectedTotal}
          />

          <PrintSelector
            selectedIds={data?.filter((d) => d.selected).map((d) => d.id)}
            selectedTotal={selectedTotal}
          />

          <ImportBtn type="cartel" onFinish={handleFetch} />

          <div className="flex">
            <ModalCreate />
          </div>
        </div>
      </header>
      <StretchBox>
        <Table
          cols={[
            {
              name: () => (
                <div className="w-full flex justify-center h-full items-center -ml-1">
                  <Checkbox
                    disabled={selectedTotal}
                    checked={selectedAll}
                    onCheck={(checked) => {
                      handleSelectAll(checked)
                    }}
                  />
                </div>
              ),
              key: 'select',
              size: 'x-small',
              component: ({ rowData }) => (
                <div className="w-full flex justify-center h-full items-center">
                  <Checkbox
                    checked={rowData.selected}
                    disabled={selectedTotal}
                    onCheck={(checked) => {
                      rowData.selected = checked
                      setData([...data])
                      if (!checked) setSelectedAll(false)
                    }}
                  />
                </div>
              ),
            },
            {
              name: 'Nom',
              key: 'name',
              sortable: true,
              searchable: true,
              component: ({ rowData }) => (
                <div className="w-full flex h-full items-center">
                  <Link href={`/admin/cartels/${rowData.id}`}>
                    {rowData.name}
                  </Link>
                </div>
              ),
            },
            {
              name: 'Status',
              key: 'status',
              size: 'small',
              searchable: true,
              sortable: true,
              component: ({ rowData }) => {
                return <StatusChip status={rowData.status} />
              },
            },
            {
              name: 'Type',
              key: 'type',
              size: 'medium',
              searchable: true,
              component: ({ rowData }) => (
                <div>{ITEM_TYPE_TITLE[rowData.rType]}</div>
              ),
            },
            {
              name: 'Emplacement',
              key: 'place',
              size: 'medium',
              sortable: true,
              searchable: true,
            },
            {
              name: '',
              key: 'delete',
              size: 'x-small',
              component: ({ rowData }) => (
                <Modal
                  content={
                    <div className="text-center">
                      <div>Êtes-vous sûr de vouloir supprimer ce cartel ?</div>
                      <div className="font-bold">{rowData.name}</div>
                    </div>
                  }
                  onConfirm={() =>
                    handleDelete({
                      id: rowData.id,
                      setData,
                      data,
                    })
                  }
                >
                  <button className="fill-mo-error">
                    <TrashIcon />
                  </button>
                </Modal>
              ),
            },
          ]}
          data={data}
          loading={loading}
          totalCount={total}
          onRowClick={({ id }) => router.push(`/admin/cartels/${id}`)}
        />
      </StretchBox>
    </div>
  )
}
