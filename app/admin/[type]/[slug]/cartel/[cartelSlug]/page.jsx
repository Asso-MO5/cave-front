import { GetCartelSlugService } from '@/_api/GetCartelSlugService.mjs'
import { auth } from '@/auth'
import { Cartel } from '@/components/Cartel'
import { PageList } from '@/layouts/page-list'
import { ITEM_TYPE_TITLE } from '@/utils/constants'

const getCartelSlugService = new GetCartelSlugService()
export default async function ItemDetails({ params: { type, cartelSlug } }) {
  const session = await auth()

  const cartel = await getCartelSlugService.execute({
    params: { slug: cartelSlug },
    context: {
      userRoles: session.user.roles.map((role) => role.name),
      api_token: session.api_token,
    },
  })

  if (!cartel.id)
    return (
      <div className="flex items-center justify-center text-mo-error text-xl h-full font-bold">
        {ITEM_TYPE_TITLE[type]} non trouvée
      </div>
    )

  return (
    <PageList session={session}>
      <Cartel cartel={cartel} />
    </PageList>
  )
}
