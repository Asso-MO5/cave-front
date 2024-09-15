import { operations } from '@/_api/operations'
import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import { caveSSR } from '@/utils/cave-ssr'
import dynamic from 'next/dynamic'

const { getItemId } = operations

const Crud = dynamic(
  () => import('@/components/cartel/Crud').then((c) => c.Crud),
  { ssr: false }
)

export default async function Cartel({ params: { id } }) {
  const session = await auth()
  const ctrl = new AbortController()
  const res = await caveSSR(getItemId.path, {
    signal: ctrl.signal,
    params: { id },
    method: getItemId.method,
  })

  if (!res.ok) {
    ctrl.abort()
    return (
      <PageList title="Cartel" session={session}>
        <div className="h-full flex items-center justify-center text-lg text-mo-error font-bold">
          Cartel non trouvé
        </div>
      </PageList>
    )
  }

  const { item: cartel } = await res.json()

  return (
    <PageList title="Cartel" session={session}>
      <Crud cartel={cartel} />
    </PageList>
  )
}
