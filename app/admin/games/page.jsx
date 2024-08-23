import { PageList } from '@/layouts/page-list'
import dynamic from 'next/dynamic'
import { GamesTable } from '@/components/GamesTable'

const ItemAddForm = dynamic(
  () => import('../../../components/ItemAddForm').then((c) => c.ItemAddForm),
  {
    ssr: false,
  }
)

export default async function Games() {
  return (
    <PageList
      title="Jeux"
      actions={<ItemAddForm title="Ajouter un jeu" type="game" />}
    >
      <GamesTable />
    </PageList>
  )
}
