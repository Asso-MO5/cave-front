'use client'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Table as TableUi } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function Table() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const ctrl = useRef()

  const handleFetch = async () => {
    setLoading(true)

    ctrl.current = new AbortController()

    const response = await fetcher.get(
      '/items?type=cartel',
      ctrl.current.signal
    )
    const { total, items } = await response.json()

    setData(items)
    setTotal(total)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    console.log('delete', id)
    ctrl.current = new AbortController()
    const oldData = data
    setData(data.filter((item) => item.id !== id))
    try {
      await fetcher.delete(`/items/${id}`, ctrl.current.signal)
    } catch (e) {
      setData(oldData)
    }
  }

  const cols = [
    {
      name: 'Nom',
      key: 'name',
    },
    {
      name: 'Type',
      key: 'type',
    },
    {
      name: '',
      key: 'delete',
      size: 'x-small',
      component: ({ rowData }) => (
        <button
          onClick={() => handleDelete(rowData.id)}
          className="fill-mo-error"
        >
          <TrashIcon />
        </button>
      ),
    },
  ]

  useEffect(() => {
    handleFetch()
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
