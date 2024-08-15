import { PageList } from '@/layouts/page-list'
import { MachineTable } from '@/components/machines-table'

export default async function Machine() {
  return (
    <PageList
      title="Machines"
      actions={
        <a href="/admin/machines/new" className="btn">
          Nouvelle machine
        </a>
      }
    >
      <MachineTable />
    </PageList>
  )
}
