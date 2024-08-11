import { PageList } from '@/layouts/page-list'
import { MachineTable } from '@/components/machines-table'
import { auth } from '@/auth'

export default async function Machine() {
  const session = await auth()
  return (
    <PageList
      title="Machines"
      actions={
        <a href="/admin/machines/new" className="btn">
          Nouvelle machine
        </a>
      }
    >
      <MachineTable session={session} />
    </PageList>
  )
}
