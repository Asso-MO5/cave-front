import { PageList } from '@/layouts/page-list'
import { MachineTable } from '@/components/machines-table'
import dynamic from 'next/dynamic'

const ItemAddForm = dynamic(
  () => import('../../../components/item-add-form').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Machine() {
  return (
    <PageList
      title="Machines"
      actions={<ItemAddForm title="Ajouter une Machine" />}
    >
      <MachineTable />
    </PageList>
  )
}
