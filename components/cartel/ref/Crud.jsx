'use client'
import { useEffect, useState } from 'react'
import { operations } from '@/_api/operations'
import { createUrl } from '@/utils/create-url'
import { fetcher } from '@/utils/fetcher'
import { CrudRefProvider } from './CrudRefProvider'
import dynamic from 'next/dynamic'

const { putItemId } = operations

const Item = dynamic(() => import('./Item').then((mod) => mod.Item), {
  ssr: false,
})

export function Crud({ item: defaultItem }) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleFetch = async () => {
    if (!defaultItem.id) return
    setLoading(true)

    const response = await fetcher.get('/item/' + defaultItem.id)
    const { item } = await response.json()

    setItem(item)
    setLoading(false)
  }

  useEffect(() => {
    handleFetch()
  }, [defaultItem])

  return (
    <CrudRefProvider
      crud={{
        get: { data: item, action: handleFetch },
        update: {
          data: item,
          async action(payload) {
            const ctrl = new AbortController()

            const keys = Object.keys(payload)

            if (keys.length === 0) return

            if (keys.some((key) => key.match(/type/))) {
              setItem((prev) => ({ ...prev, type: payload.type }))
            }

            // -----|| ITEM ||----------------------------------------------
            fetcher[putItemId.method](
              createUrl(putItemId.path, { id: item.id }),
              ctrl.signal,
              payload
            )
          },
        },
        create: { data: item },
        delete: { data: item },
      }}
    >
      {loading ? <div>Chargement ...</div> : <Item />}
    </CrudRefProvider>
  )
}
