'use client'

import { createContext, useContext } from 'react'
import { SessionProvider, useSession } from './SessionProvider'

import { CompanyDetails } from './CompanyDetails'
import { fetcher } from '@/utils/fetcher'
import { toast } from 'react-toastify'

const Ctx = createContext()

function Provider({ children, ctx }) {
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
}

export function useCompany() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCompany must be used within a CompanyProvider')
  return ctx
}

export function Company({ company }) {
  const session = useSession()

  return (
    <SessionProvider session={session}>
      <Provider
        ctx={{
          company,
          async update(partial) {
            const controller = new AbortController()
            const signal = controller.signal
            const form = new FormData()
            const keys = Object.keys(partial)

            if (partial.logo) form.append('logo', partial.logo)

            if (keys.includes('name')) form.append('name', partial.name)

            if (keys.includes('logo_id'))
              form.append('logo_id', partial.logo_id)

            if (keys.includes('logo_url'))
              form.append('logo_url', partial.logo_url)

            if (keys.includes('borned_at'))
              form.append('borned_at', partial.borned_at)

            if (keys.includes('description'))
              form.append('description', JSON.stringify(partial.description))

            const res = await fetcher.put(
              '/companies/' + company.id,
              signal,
              form
            )
            if (res.status > 201) toast.error('Erreur lors de la mise à jour')
          },
        }}
      >
        <CompanyDetails />
      </Provider>
    </SessionProvider>
  )
}
