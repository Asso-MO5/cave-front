import { operations } from '@/_api/operations'
import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import { caveSSR } from '@/utils/cave-ssr'
import dynamic from 'next/dynamic'

const { getItemId } = operations

const Crud = dynamic(
  () => import('@/components/cartel/ref/Crud').then((mod) => mod.Crud),
  {
    ssr: false,
  }
)

export default async function Cartel({ params: { id } }) {
  const session = await auth()
  const ctrl = new AbortController()
  const res = await caveSSR(getItemId.path, {
    signal: ctrl.signal,
    params: { id },
    method: getItemId.method,
  })

  const { item: cartel } = await res.json()

  return (
    <PageList session={session}>
      <Crud cartel={cartel} />
    </PageList>
  )
}
