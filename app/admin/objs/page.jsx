import { auth } from '@/auth'
import { ObjTable } from '@/components/ObjTable'
import { PageList } from '@/layouts/page-list'

import dynamic from 'next/dynamic'

const ItemAddForm = dynamic(
  () => import('../../../components/ItemAddForm').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Machines() {
  const session = await auth()
  return (
    <PageList
      title="Objets"
      actions={<ItemAddForm title="Ajouter un objet" type="obj" />}
      session={session}
    >
      <ObjTable />
    </PageList>
  )
}
