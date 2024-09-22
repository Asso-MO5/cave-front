import { operations } from '@/_api/operations'
import { cavePublicSSR } from '@/utils/cave-public-ssr'
import dynamic from 'next/dynamic'

const { getItemPublicId } = operations

const Public = dynamic(
  () => import('@/components/item/Public').then((mod) => mod.Public),
  {
    ssr: false,
  }
)

export default async function Item({ params: { id } }) {
  const ctrl = new AbortController()
  const res = await cavePublicSSR(getItemPublicId.path, {
    signal: ctrl.signal,
    params: { id },
    method: getItemPublicId.method,
  })

  const { item } = await res.json()

  return <Public item={item} />
}
