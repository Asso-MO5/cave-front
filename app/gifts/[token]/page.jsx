import { operations } from '@/_api/operations'
import { caveSSR } from '@/utils/cave-ssr'
import dynamic from 'next/dynamic'

const FormUpdate = dynamic(
  () => import('@/components/gift/FormUpdate').then((mod) => mod.FormUpdate),
  {
    ssr: false,
  }
)

export default async function PublicLootsPage({ params: { token } }) {
  const gift = await caveSSR(operations.getGiftToken.path, {
    params: { token },
    noToken: true,
  }).then((res) => res.json())

  return <FormUpdate gift={gift} token={token} />
}
