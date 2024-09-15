'use client'
import { useEffect, useState } from 'react'
import { CrudProvider } from '@/components/crud/provider'
import { operations } from '@/_api/operations'
import { createUrl } from '@/utils/create-url'
import { fetcher } from '@/utils/fetcher'
import { Item } from './Item'

const { putItemId, putItemIdStatusStatus, putItemIdMedia } = operations

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
    <CrudProvider
      name="ref_item"
      crud={{
        get: { data: item, action: handleFetch },
        update: {
          data: item,
          async action(payload) {
            const ctrl = new AbortController()

            const keys = Object.keys(payload)

            if (keys.length === 0) return
            // -----|| STATUS ||----------------------------------------------
            if (keys.some((key) => key === 'status')) {
              const oldStatus = cartel.status

              setCartel((prev) => ({ ...prev, status: payload.status }))
              const res = await fetcher[putItemIdStatusStatus.method](
                createUrl(putItemIdStatusStatus.path, {
                  id: cartel.id,
                  status: payload.status,
                }),
                ctrl.signal
              )

              if (!res.ok) setCartel((prev) => ({ ...prev, status: oldStatus }))

              return
            }

            if (keys.some((key) => key === 'cover')) {
              const form = new FormData()

              if (payload.cover?.file) form.append('cover', payload.cover.file)
              if (payload.cover?.id) form.append('cover_id', payload.cover.id)
              if (payload.cover?.url)
                form.append('cover_url', payload.cover.url)

              fetcher.putFile(
                createUrl(putItemIdMedia.path, { id: cartel.id }),
                ctrl.signal,
                form
              )
              return
            }

            // -----|| ITEM ||----------------------------------------------
            fetcher[putItemId.method](
              createUrl(putItemId.path, { id: cartel.id }),
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
    </CrudProvider>
  )
}
