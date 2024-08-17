'use client'

import { createContext, useContext } from 'react'
import { ItemCover } from './item-cover'
import { useEmit } from '@/hooks/useEmit'
import { fetcher } from '@/utils/fetcher'
import { ItemName } from './item-name'
import { ItemReleaseYear } from './item-release-year'
import { ItemDescription } from './item-description'
import { ItemCompany } from './item-company'
import { toast } from 'react-toastify'

const Ctx = createContext()

function Provider({ children, ctx }) {
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
}

export function useItem() {
  const ctx = useContext(Ctx)
  if (!ctx) {
    throw new Error('useItem must be used within a ItemProvider')
  }
  return ctx
}

export function Item({ item }) {
  const { emit } = useEmit()

  return (
    <Provider
      ctx={{
        item,
        async update(partial) {
          const form = new FormData()

          const keys = Object.keys(partial)

          if (partial.cover) {
            form.append('cover', partial.cover)
          }

          if (keys.includes('name')) form.append('name', partial.name)

          if (keys.includes('cover_id'))
            form.append('cover_id', partial.cover_id)

          if (keys.includes('release_year'))
            form.append('release_year', partial.release_year)

          if (keys.includes('description'))
            form.append('description', JSON.stringify(partial.description))

          if (keys.includes('company')) {
            form.append('company_id', partial.company.id)
            form.append('company_old_id', partial.company.oldId)
          }

          const controller = new AbortController()
          const signal = controller.signal
          const res = await fetcher.put('/items/' + item.id, signal, form)
          if (res.status > 201) toast.error('Erreur lors de la mise à jour')
        },
      }}
    >
      <div className="flex flex-col sm:flex-row-reverse w-full max-w-2xl m-auto">
        <div className="flex flex-col">
          <ItemCover />
          <ItemReleaseYear />
          <ItemCompany />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <ItemName />
          <ItemDescription />
        </div>
      </div>
    </Provider>
  )
}
