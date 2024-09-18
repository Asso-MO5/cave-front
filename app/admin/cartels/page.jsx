import { auth } from '@/auth'
import { Modal } from '@/components/cartel/create/Modal'
import { Table } from '@/components/cartel/Table'
import { PageList } from '@/layouts/page-list'

export default async function Cartels() {
  const session = await auth()
  return (
    <PageList title="Cartels" actions={<Modal />} session={session}>
      <Table />
    </PageList>
  )
}
