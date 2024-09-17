'use client'
import { useState } from 'react'
import { CrudProvider } from '../crud/provider'
import { Cartel } from './Cartel'
import { operations } from '@/_api/operations'
import { createUrl } from '@/utils/create-url'
import { fetcher } from '@/utils/fetcher'

const { putItemId, putItemIdStatusStatus, putItemIdMedia } = operations
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

            if (keys.some((key) => key.match(/cover/))) {
              const form = new FormData()

              if (payload.cover_file) form.append('cover', payload.cover_file)
              if (payload.cover_id) form.append('cover_id', payload.cover_id)
              if (payload.cover_url)
                form.append('cover_url', payload.cover_urll)

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
        create: { data: cartel },
        delete: { data: cartel },
      }}
    >
      <Cartel />
    </CrudProvider>
  )
}
