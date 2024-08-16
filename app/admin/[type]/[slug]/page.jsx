import { auth } from '@/auth'
import { Item } from '@/components/item'
import { ItemCover } from '@/components/item-cover'
import { ItemName } from '@/components/item-name'
import { PageList } from '@/layouts/page-list'
import { ITEM_TYPE_TITLE } from '@/utils/constants'

export default async function MachineDetails({ params: { slug, type } }) {
  const session = await auth()
  const signal = new AbortController().signal

  const item = await fetch(process.env.NEXT_PUBLIC_API_URL + '/items/' + slug, {
    signal,
    headers: {
      Authorization: 'Bearer ' + session.api_token,
    },
  }).then((res) => res.json())

  if (!item) return <div>{ITEM_TYPE_TITLE[type]} non trouvée</div>
  return (
    <PageList title={ITEM_TYPE_TITLE[type]} actions={<></>}>
      <Item item={item} />
    </PageList>
  )
}
