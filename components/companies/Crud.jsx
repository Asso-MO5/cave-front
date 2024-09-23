'use client'
import { useState } from 'react'
import { operations } from '@/_api/operations'
import { createUrl } from '@/utils/create-url'
import { fetcher } from '@/utils/fetcher'
import dynamic from 'next/dynamic'
import { CrudProvider } from '../crud/provider'
import { toast } from 'react-toastify'

const { putCompanies, putCompanyIdMedia, putCompanyIdStatusStatus } = operations

const Company = dynamic(() => import('./Company').then((mod) => mod.Company), {
  ssr: false,
})

export function Crud({ company: defaultCompany }) {
  const [company, setCompany] = useState(defaultCompany)

  return (
    <CrudProvider
      name="company"
      crud={{
        get: { data: company },
        update: {
          data: company,
          async action(payload) {
            const ctrl = new AbortController()

            const keys = Object.keys(payload)

            if (keys.length === 0) return
            // -----|| STATUS ||----------------------------------------------

            if (keys.some((key) => key === 'status')) {
              const oldStatus = company.status

              setCompany((prev) => ({ ...prev, status: payload.status }))
              const res = await fetcher[putCompanyIdStatusStatus.method](
                createUrl(putCompanyIdStatusStatus.path, {
                  id: company.id,
                  status: payload.status,
                }),
                ctrl.signal
              )

              if (!res.ok)
                setCompany((prev) => ({ ...prev, status: oldStatus }))

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
                createUrl(putCompanyIdMedia.path, { id: company.id }),
                ctrl.signal,
                form
              )
              const { item: resMediaJson } = await resMedia.json()

              setCompany((prev) => ({
                ...prev,
                ...resMediaJson,
              }))
              return
            }

            // -----|| ITEM ||----------------------------------------------

            try {
              const response = await fetcher[putCompanies.method](
                createUrl(putCompanies.path),
                ctrl.signal,
                {
                  ids: company.alternatives.map((alt) => alt.id),
                  body: payload,
                }
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
        create: { data: company },
        delete: { data: company },
      }}
    >
      <Company />
    </CrudProvider>
  )
}
