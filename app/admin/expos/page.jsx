import { auth } from '@/auth'
import { ExpoTable } from '@/components/ExpoTable'
import { PageList } from '@/layouts/page-list'

import dynamic from 'next/dynamic'

const ItemAddForm = dynamic(
  () => import('../../../components/ItemAddForm').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Expos() {
  const session = await auth()
  return (
    <PageList
      title="Expositions"
      actions={<ItemAddForm title="Ajouter une Expo" type="expo" />}
      session={session}
    >
      <ExpoTable />
    </PageList>
  )
}
