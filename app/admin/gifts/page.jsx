import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'

const GiftsPack = dynamic(
  () => import('@/components/giftsPack/GiftsPack').then((mod) => mod.GiftsPack),
  {
    ssr: false,
  }
)

export default async function CartelsPage() {
  const session = await auth()
  return (
    <PageList session={session}>
      <GiftsPack />
    </PageList>
  )
}
