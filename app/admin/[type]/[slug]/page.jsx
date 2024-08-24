import { API } from '@/api/api'
import { auth } from '@/auth'
import { Item } from '@/components/Item'
import { PageList } from '@/layouts/page-list'
import { caveSSR } from '@/utils/cave-ssr'
import { ITEM_TYPE_TITLE } from '@/utils/constants'

export default async function MachineDetails({ params: { slug, type } }) {
  const session = await auth()
  const signal = new AbortController().signal

  const item = await caveSSR(
    { path: '/game/{slug}' },
    {
      signal,
      params: { slug },
    }
  ).then((res) => res.json())

  console.log('ITEM :', item)
  if (!item) return <div>{ITEM_TYPE_TITLE[type]} non trouvée</div>
  return (
    <PageList session={session}>
      <Item item={item} session={session} />
    </PageList>
  )
}
