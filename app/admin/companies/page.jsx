import { auth } from '@/auth'
import { CompaniesTable } from '@/components/CompaniesTable'
import { PageList } from '@/layouts/page-list'

import dynamic from 'next/dynamic'

const ItemAddForm = dynamic(
  () => import('../../../components/ItemAddForm').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Companies() {
  const session = await auth()
  return (
    <PageList
      title="Expositions"
      actions={<ItemAddForm title="Ajouter une Expo" type="expo" />}
      session={session}
    >
      <CompaniesTable />
    </PageList>
  )
}
