'use client'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { Table as TableUi } from '@/ui/table/Table'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { fetcher } from '@/utils/fetcher'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// =====  [[ COMPONENT ]]  =====

export function Table() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const cols = [
    {
      name: 'Nom',
      key: 'name',
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

    const response = await fetcher.get('/items?type=cartel', ctrl.signal)
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
  }, [])

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
