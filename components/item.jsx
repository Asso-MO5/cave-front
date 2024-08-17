'use client'

import { createContext, useContext } from 'react'
import { ItemCover } from './item-cover'
import { fetcher } from '@/utils/fetcher'
import { ItemName } from './item-name'
import { ItemReleaseYear } from './item-release-year'
import { ItemDescription } from './item-description'
import { ItemCompany } from './item-company'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'

const companies = {
  machine: ['manufacturer'],
  game: ['developer', 'publisher'],
}

const Ctx = createContext()

function Provider({ children, ctx }) {
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
}

export function useItem() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useItem must be used within a ItemProvider')
  return ctx
}

export function Item({ item }) {
  const { type } = useParams()

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
            form.append('company_relation_type', partial.company.relation_type)
          }

          const controller = new AbortController()
          const signal = controller.signal
          const res = await fetcher.put('/items/' + item.id, signal, form)
          if (res.status > 201) toast.error('Erreur lors de la mise à jour')
        },
      }}
    >
      <div className="flex flex-col sm:flex-row-reverse w-full m-auto">
        <div className="flex flex-col">
          <div className="sm:hidden">
            <ItemName />
          </div>
          <ItemCover />
          <ItemReleaseYear />
          {companies[type].map((company) => (
            <ItemCompany key={company} type={company} />
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="hidden sm:block">
            <ItemName />
          </div>
          <ItemDescription />
        </div>
      </div>
    </Provider>
  )
}
