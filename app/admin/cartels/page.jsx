import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'

const Cartels = dynamic(
  () => import('@/components/cartel/Cartels').then((mod) => mod.Cartels),
  {
    ssr: false,
  }
)

export default async function CartelsPage() {
  const session = await auth()

  return (
    <PageList session={session}>
      <Cartels />
    </PageList>
  )
}
