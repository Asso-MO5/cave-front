'use client'
import { StretchBox } from '@/ui/StretchBox'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { Modal } from './create/Modal'
import { Modal as ModalUi } from '@/ui/Modal'
import { TrashIcon } from '@/ui/icon/TrashIcon'

export function PublicLoots() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  async function handleFetch() {
    setLoading(true)

    const ctrl = new AbortController()
    const params = new URLSearchParams(window.location.search)
    if (!params.get('limit')) params.set('limit', 50)
    const url = `/loots_public?${params.toString()}`

    const response = await fetcher.get(url, ctrl.signal)
    const { total, items } = await response.json()

    setData(items)
    setTotal(total)
    setLoading(false)
  }

  async function handleDelete({ id }) {
    const ctrl = new AbortController()
    const oldData = data
    setData(data.filter((item) => item.id !== id))
    try {
      await fetcher.delete(`/loots/${id}`, ctrl.signal)
    } catch (e) {
      setData(oldData)
    }
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
    searchParams.get('winnerName'),
    searchParams.get('winned_at'),
    searchParams.get('withdrawal_at'),
    searchParams.get('limit'),
  ])

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] gap-2">
      <header className="flex gap-2 items-center justify-between w-full">
        <h1>Loots</h1>
        <div className="flex  gap-2 items-center justify-end">
          <Modal onCreate={handleFetch} />
        </div>
      </header>
      <StretchBox>
        <Table
          cols={[
            {
              name: 'Nom',
              key: 'winnerName',
              sortable: true,
              searchable: true,
            },
            {
              name: 'gain',
              key: 'loot',
              sortable: true,
              searchable: true,
            },
            {
              name: 'gagné le',
              key: 'winned_at',
              sortable: true,
              component: ({ rowData }) => {
                return (
                  <div>{new Date(rowData.winned_at).toLocaleDateString()}</div>
                )
              },
            },
            {
              name: 'récupéré',
              key: 'withdrawal_at',
              sortable: true,
              component: ({ rowData }) => {
                if (!rowData.withdrawal_at) return <div>Non</div>
                return (
                  <div>{new Date(rowData.winned_at).toLocaleDateString()}</div>
                )
              },
            },
            {
              name: '',
              key: 'delete',
              size: 'x-small',
              component: ({ rowData }) => (
                <ModalUi
                  content={
                    <div className="text-center">
                      <div>Êtes-vous sûr de vouloir supprimer ce gagnant ?</div>
                      <div className="font-bold">{rowData.winnerName}</div>
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
                </ModalUi>
              ),
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
