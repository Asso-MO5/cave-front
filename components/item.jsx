'use client'

import { createContext, useContext } from 'react'
import { ItemCover } from './item-cover'
import { fetcher } from '@/utils/fetcher'
import { ItemName } from './item-name'
import { ItemReleaseYear } from './item-release-year'
import { ItemDescription } from './item-description'
import { ItemCompany } from './item-company'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { ITEM_TYPE, ITEM_TYPE_TITLE } from '@/utils/constants'
import { GameMachineSelector } from './game-machine-selector'

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
  const { push } = useRouter()

  return (
    <Provider
      ctx={{
        item,
        async update(partial) {
          const controller = new AbortController()
          const signal = controller.signal
          const form = new FormData()
          const keys = Object.keys(partial)

          if (partial.machineId) {
            const res = await fetcher.put(
              '/machine/' + partial.machineId + '/game/' + item.id,
              signal
            )

            if (res.status > 201) toast.error('Erreur lors de la mise à jour')

            const resJson = await res.json()

            if (resJson.slug && resJson.id !== item.id)
              return push('/admin/game/' + resJson.slug)
            if (resJson.slug === item.slug) return window.location.reload()
          }

          if (partial.cover) form.append('cover', partial.cover)

          if (keys.includes('name')) form.append('name', partial.name)

          if (keys.includes('cover_id'))
            form.append('cover_id', partial.cover_id)

          if (keys.includes('cover_url'))
            form.append('cover_url', partial.cover_url)

          if (keys.includes('release_year'))
            form.append('release_year', partial.release_year)

          if (keys.includes('description'))
            form.append('description', JSON.stringify(partial.description))

          if (keys.includes('company')) {
            form.append('company_id', partial.company.id)
            form.append('company_old_id', partial.company.oldId)
            form.append('company_relation_type', partial.company.relation_type)
          }

          const res = await fetcher.put('/items/' + item.id, signal, form)
          if (res.status > 201) toast.error('Erreur lors de la mise à jour')
        },
      }}
    >
      <div className="flex flex-col sm:grid sm:grid-cols-[4fr_1fr] w-full m-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
                {ITEM_TYPE_TITLE[type]}
              </div>
              <ItemName />
            </div>
            {type === 'game' && <GameMachineSelector />}
          </div>
          <ItemDescription />
        </div>

        <div className="flex flex-col">
          <ItemCover />
          <ItemReleaseYear />
          {companies[type].map((company) => (
            <ItemCompany key={company} type={company} />
          ))}
        </div>
      </div>
    </Provider>
  )
}
