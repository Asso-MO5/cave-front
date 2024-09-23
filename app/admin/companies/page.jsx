import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'

const Companies = dynamic(
  () => import('@/components/companies/Companies').then((mod) => mod.Companies),
  {
    ssr: false,
  }
)

export default async function CartelsPage() {
  const session = await auth()
  return (
    <PageList session={session}>
      <Companies />
    </PageList>
  )
}
