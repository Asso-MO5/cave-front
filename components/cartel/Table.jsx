'use client'
import { Checkbox } from '@/ui/Checkbox'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { Table as TableUi } from '@/ui/table/Table'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { fetcher } from '@/utils/fetcher'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// =====  [[ COMPONENT ]]  =====

export function Table() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const cols = [
    {
      name: '',
      key: 'select',
      size: 'x-small',
      component: ({ rowData }) => (
        <Checkbox
          checked={rowData.selected}
          onCheck={(checked) => {
            rowData.selected = checked
            setData([...data])
          }}
        />
      ),
    },
    {
      name: 'Nom',
      key: 'name',
      sortable: true,
      searchable: true,
    },
    {
      name: 'Type',
      key: 'rType',
      component: ({ rowData }) => <div>{ITEM_TYPE_TITLE[rowData.rType]}</div>,
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
  ]

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
    const url = `/items?type=cartel&${params.toString()}`

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
    <TableUi
      cols={cols}
      data={data}
      loading={loading}
      totalCount={total}
      onRowClick={({ id }) => router.push(`/admin/cartels/${id}`)}
    />
  )
}
