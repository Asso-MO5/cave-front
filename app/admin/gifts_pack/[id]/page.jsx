import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'

const Gifts = dynamic(
  () => import('@/components/giftsPack/Gifts').then((mod) => mod.Gifts),
  {
    ssr: false,
  }
)

export default async function CartelsPage() {
  const session = await auth()
  return (
    <PageList session={session}>
      <Gifts />
    </PageList>
  )
}
