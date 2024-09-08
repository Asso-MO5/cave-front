import { GetCompaniesSlugService } from '@/_api/GetCompaniesSlugService.mjs'
import { auth } from '@/auth'
import { Company } from '@/components/Company'
import { PageList } from '@/layouts/page-list'

const getCompaniesSlugService = new GetCompaniesSlugService()

export default async function CompanyDetails({ params: { slug } }) {
  const session = await auth()

  const company = await getCompaniesSlugService.execute({
    params: { slug },
    context: {
      userRoles: session.user.roles.map((role) => role.name),
      api_token: session.api_token,
    },
    noModel: true,
  })

  if (!company.id)
    return (
      <div className="flex items-center justify-center text-mo-error text-xl h-full font-bold">
        non trouvée
      </div>
    )

  return (
    <PageList session={session}>
      <Company company={company} />
    </PageList>
  )
}
