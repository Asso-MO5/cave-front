import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'

const Modal = dynamic(
  () => import('@/components/cartel/create/Modal').then((mod) => mod.Modal),
  {
    ssr: false,
  }
)

const Table = dynamic(
  () => import('@/components/cartel/Table').then((mod) => mod.Table),
  {
    ssr: false,
  }
)

export default async function Cartels() {
  const session = await auth()
  return (
    <PageList title="Cartels" actions={<Modal />} session={session}>
      <Table />
    </PageList>
  )
}
