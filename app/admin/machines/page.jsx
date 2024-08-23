import { MachineTable } from '@/components/MachineTable'
import { PageList } from '@/layouts/page-list'

import dynamic from 'next/dynamic'

const ItemAddForm = dynamic(
  () => import('../../../components/ItemAddForm').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Machines() {
  return (
    <PageList
      title="Machines"
      actions={<ItemAddForm title="Ajouter une Machine" type="machine" />}
    >
      <MachineTable />
    </PageList>
  )
}
