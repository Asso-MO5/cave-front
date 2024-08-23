import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'
import { GamesTable } from '@/components/GamesTable'
import { auth } from '@/auth'

const ItemAddForm = dynamic(
  () => import('../../../components/ItemAddForm').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Games() {
  const session = await auth()
  return (
    <PageList
      title="Jeux"
      session={session}
      actions={
        <ItemAddForm title="Ajouter un jeu" type="game" session={session} />
      }
    >
      <GamesTable />
    </PageList>
  )
}
