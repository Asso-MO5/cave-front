'use client'
import { useState } from 'react'
import { operations } from '@/_api/operations'
import { createUrl } from '@/utils/create-url'
import { fetcher } from '@/utils/fetcher'
import dynamic from 'next/dynamic'
import { CrudProvider } from '../crud/provider'
import { toast } from 'react-toastify'

const {
  putItemId,
  putItemIdStatusStatus,
  putItemIdMedia,
  deleteItemItemidMediaMediaid,
} = operations

const Cartel = dynamic(() => import('./Cartel').then((mod) => mod.Cartel), {
  ssr: false,
})

export function Crud({ cartel: defaultCartel }) {
  const [cartel, setCartel] = useState(defaultCartel)

  return (
    <CrudProvider
      name="cartel"
      crud={{
        get: { data: cartel },
        update: {
          data: cartel,
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

            if (keys.some((key) => key.match(/media/))) {
              const form = new FormData()

              if (payload.media) form.append('media', payload.media)
              if (payload.file) form.append('file', payload.file)
              if (payload.id) form.append('id', payload.id)
              if (payload.url) form.append('url', payload.url)
              if (payload.create) form.append('create', payload.create)

              const resMedia = await fetcher.putFile(
                createUrl(putItemIdMedia.path, { id: cartel.id }),
                ctrl.signal,
                form
              )
              const resMediaJson = await resMedia.json()

              setCartel((prev) => ({
                ...prev,
                ...resMediaJson,
              }))
              return
            }

            // -----|| ITEM ||----------------------------------------------

            try {
              const response = await fetcher[putItemId.method](
                createUrl(putItemId.path, { id: cartel.id }),
                ctrl.signal,
                payload
              )

              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
              }
            } catch (e) {
              toast.error(e.message)
            }
          },
        },
        create: { data: cartel },
        delete: {
          data: cartel,
          async action(mediaId) {
            const ctrl = new AbortController()

            const oldCartel = { ...cartel }
            setCartel((prev) => ({
              ...prev,
              medias: prev.medias.filter((m) => m.id !== mediaId),
            }))

            try {
              await fetcher.delete(
                createUrl(deleteItemItemidMediaMediaid.path, {
                  itemId: cartel.id,
                  mediaId,
                }),
                ctrl.signal
              )
            } catch (e) {
              setCartel(oldCartel)
              toast.error(e.message)
            }

            deleteItemItemidMediaMediaid
          },
        },
      }}
    >
      <Cartel />
    </CrudProvider>
  )
}
