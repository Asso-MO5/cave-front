import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'

const Loots = dynamic(
  () => import('@/components/loots/Loots').then((mod) => mod.Loots),
  {
    ssr: false,
  }
)

export default async function CartelsPage() {
  const session = await auth()
  return (
    <PageList session={session}>
      <Loots />
    </PageList>
  )
}
