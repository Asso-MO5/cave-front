'use client'
import { StretchBox } from '@/ui/StretchBox'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { Modal } from './create/Modal'
import { Modal as ModalUi } from '@/ui/Modal'
import { Modal as ModalDistribution } from '@/components/giftsPack/distribution/Modal'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { StatusChip } from '@/ui/StatusChip'

export function GiftsPack() {
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
    const url = `/gifts_packs?${params.toString()}`

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
      await fetcher.delete(`/gifts_packs/${id}`, ctrl.signal)
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
          onRowClick={(rowData) =>
            router.push(`/admin/gifts_pack/${rowData.id}`)
          }
          cols={[
            {
              name: 'Distributeur',
              key: 'retailer',
              sortable: true,
              searchable: true,
              component: ({ rowData }) => (
                <div>
                  <div>{rowData.retailer || 'mo5'}</div>
                  <div className="opaticy-50 text-xs italic">
                    {rowData?.email}
                  </div>
                </div>
              ),
            },

            {
              name: 'Campagne',
              key: 'campain',
              sortable: true,
              searchable: true,
            },
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
              name: 'Nb cadeaux',
              key: 'numOfGifts',
              //size: 'small',
              sortable: true,
              component: ({ rowData }) => (
                <div
                  className="text-center font-bold"
                  title={`
                  ${rowData.givenNumOfGifts} distribué${
                    rowData.givenNumOfGifts > 1 ? 's' : ''
                  } sur ${rowData.numOfGifts} prévu${
                    rowData.numOfGifts > 1 ? 's' : ''
                  }
                  `}
                >
                  <span>{rowData.givenNumOfGifts}</span>
                  {' / '}
                  <span>{rowData.numOfGifts}</span>
                </div>
              ),
            },
            {
              name: 'Créé le',
              key: 'created_at',
              sortable: true,
              component: ({ rowData }) => (
                <div className="text-center font-bold">
                  {new Date(rowData.created_at).toLocaleDateString()}
                </div>
              ),
            },
            {
              name: '',
              key: 'update',
              component: ({ rowData }) =>
                rowData.status === 'distributed' ? (
                  <div>non modifiable</div>
                ) : (
                  <div className="flex justify-center h-full items-center w-full">
                    <Modal
                      onCreate={(newData) =>
                        setData(
                          data.map((item) =>
                            item.id === rowData.id ? newData : item
                          )
                        )
                      }
                      initialData={rowData}
                    />
                  </div>
                ),
            },
            {
              name: '',
              key: 'distribution',
              component: ({ rowData }) => (
                <ModalDistribution
                  rowData={rowData}
                  setData={(newData) =>
                    setData(
                      data.map((item) =>
                        item.id === rowData.id ? newData : item
                      )
                    )
                  }
                />
              ),
            },
            {
              name: '',
              key: 'delete',
              size: 'x-small',
              component: ({ rowData }) => (
                <ModalUi
                  content={
                    <div className="text-center">
                      <div>Êtes-vous sûr de vouloir supprimer ce pack ?</div>
                      <div className="font-bold">{`${rowData.retailer} - ${rowData.campain}`}</div>
                    </div>
                  }
                  onConfirm={() =>
                    handleDelete({
                      id: rowData.id,
                      setData,
                      data,
                    })
                  }
                  disabled={loading || rowData.givenNumOfGifts > 0}
                >
                  <button
                    className="fill-mo-error disabled:opacity-50"
                    disabled={loading}
                  >
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
