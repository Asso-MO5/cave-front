'use client'

import { GetCompaniesLightService } from '@/_api/GetCompaniesLightService.mjs'
import { useApi } from '@/hooks/useApi'
import { getActivities } from '@/utils/get-activities'
import { useRouter } from 'next/navigation'

export function CompaniesTable() {
  const { push } = useRouter()
  const { data, error, loading } = useApi(GetCompaniesLightService, {
    query: {
      limit: 100000,
    },
  })

  if (error)
    return (
      <div className="text-center text-mo-error">Erreur: {error.message}</div>
    )

  if (loading)
    return <div className="flex items-center justify-center">Chargement...</div>

  if (!loading && Array.isArray(data) && data?.length === 0)
    return (
      <div className="text-center h-full flex justify-center items-center font-secondary font-bold">
        Aucune compagnie trouvée
      </div>
    )

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <div className="grid grid-cols-[2fr_1fr] gap-2 sticky top-1 bg-mo-bg font-bold text-mo-primary mt-2 text-center">
        {['Nom', 'Activités'].map((header) => (
          <div key={header} className="truncate">
            {header}
          </div>
        ))}
      </div>
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto">
          {data?.map((company) => (
            <div
              key={company.slug}
              className="grid grid-cols-[2fr_1fr] gap-2 hover:text-mo-primary cursor-pointer odd:bg-black/5 p-1"
              onClick={() => push(`/admin/companies/${company.slug}`)}
            >
              <div className="first-letter:uppercase font-bold">
                {company.name}
              </div>
              <div className="text-center">
                {company.activities
                  ? getActivities(company.activities).join(', ')
                  : '---'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
