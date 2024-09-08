'use client'

import { createContext, useContext } from 'react'
import { fetcher } from '@/utils/fetcher'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { SessionProvider, useSession } from './SessionProvider'
import { PutItemsIdStatusStatusService } from '@/_api/PutItemsIdStatusStatusService'
import { ItemClassic } from './ItemClassic'
import { Expo } from './Expo'
import { ItemCartel } from './ItemCartel'

const Ctx = createContext()

function Provider({ children, ctx }) {
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
}

export function useItem() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useItem must be used within a ItemProvider')
  return ctx
}

export function Item({ item, type: type_ }) {
  const session = useSession()
  const { type: paramsType } = useParams()
  const { push } = useRouter()

  const type = type_ || paramsType

  return (
    <SessionProvider session={session}>
      <Provider
        ctx={{
          item,
          async update(partial) {
            const controller = new AbortController()
            const signal = controller.signal
            const form = new FormData()
            const keys = Object.keys(partial)

            // -----|| Update status ||-----
            if (keys.includes('status')) {
              const apiStatus = new PutItemsIdStatusStatusService()
              try {
                await apiStatus.execute({
                  params: { status: partial.status, id: item.id },
                  context: {
                    userRoles: session?.user.roles.map((r) => r.name) || [],
                  },
                })
              } catch (err) {
                console.error(err)
                toast.error('Erreur lors de la mise à jour du status')
              } finally {
                return
              }
            }
            // --------------------------

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
              form.append(
                'company_relation_type',
                partial.company.relation_type
              )
            }

            const res = await fetcher.put('/items/' + item.id, signal, form)
            if (res.status > 201) toast.error('Erreur lors de la mise à jour')
          },
        }}
      >
        {type.match(/game|machine|obj/) && <ItemClassic />}
        {type.match(/expo/) && <Expo />}
        {type.match(/cartel/) && <ItemCartel />}
      </Provider>
    </SessionProvider>
  )
}
