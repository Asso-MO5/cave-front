import { GetExposSlugService } from '@/_api/GetExposSlugService.mjs'
import { GetGameSlugService } from '@/_api/GetGameSlugService'
import { GetMachineSlugService } from '@/_api/GetMachineSlugService'
import { GetObjSlugService } from '@/_api/GetObjSlugService.mjs'
import { auth } from '@/auth'
import { Item } from '@/components/Item'
import { PageList } from '@/layouts/page-list'
import { ITEM_TYPE_TITLE } from '@/utils/constants'

const classType = {
  game: GetGameSlugService,
  machine: GetMachineSlugService,
  obj: GetObjSlugService,
  expo: GetExposSlugService,
  list: undefined,
}

export default async function ItemDetails({ params: { slug, type } }) {
  const session = await auth()

  const entity = new classType[type]()

  if (!entity)
    return (
      <div className="flex items-center justify-center text-mo-error text-xl h-full font-bold">
        {ITEM_TYPE_TITLE[type]} non trouvée
      </div>
    )

  const item = await entity.execute({
    params: { slug },
    context: {
      userRoles: session.user.roles.map((role) => role.name),
      api_token: session.api_token,
    },
  })

  if (!item.id)
    return (
      <div className="flex items-center justify-center text-mo-error text-xl h-full font-bold">
        {ITEM_TYPE_TITLE[type]} non trouvée
      </div>
    )

  return (
    <PageList session={session}>
      <Item item={item} />
    </PageList>
  )
}
