'use client'

import { DeleteCompaniesIdService } from '@/_api/DeleteCompaniesIdService.mjs'
import { GetCompaniesLightService } from '@/_api/GetCompaniesLightService.mjs'
import { useApi } from '@/hooks/useApi'
import { useCheckRoles } from '@/hooks/useCheckRoles'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { getActivities } from '@/utils/get-activities'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function CompaniesTable() {
  const { push } = useRouter()
  const { data, error, loading, refetch } = useApi(GetCompaniesLightService, {
    query: {
      limit: 100000,
    },
  })

  const {
    mutate: delCompany,
    error: errDel,
    roles,
  } = useApi(DeleteCompaniesIdService, {
    autoFetch: false,
  })

  const canDelete = useCheckRoles(roles)
  const handleDelete = async (id) => {
    const toastId = toast.info('Suppression en cours...', {
      autoClose: false,
    })

    try {
      await delCompany({ params: { id } })

      toast.dismiss(toastId)
      toast.success('Compagnie supprimée avec succès')
      refetch()
    } catch (err) {
      console.log(err)
      toast.dismiss(toastId)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (errDel) toast.error(errDel.message)
  }, [errDel])

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

  const cols = canDelete ? ['Nom', 'Activités', ''] : ['Nom', 'Activités']

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <div
        data-can-delete={canDelete}
        className="grid data-[can-delete=true]:grid-cols-[2fr_1fr_1Fr] data-[can-delete=false]:grid-cols-[2fr_1fr] gap-2 sticky top-1 bg-mo-bg font-bold text-mo-primary mt-2 text-center"
      >
        {cols.map((header) => (
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
              data-can-delete={canDelete}
              className="grid data-[can-delete=true]:grid-cols-[2fr_1fr_1Fr] data-[can-delete=false]:grid-cols-[2fr_1fr] gap-2 hover:text-mo-primary cursor-pointer odd:bg-black/5 p-1"
            >
              <div
                className="first-letter:uppercase font-bold"
                onClick={() => push(`/admin/companies/${company.slug}`)}
              >
                {company.name}
              </div>
              <div
                className="text-center"
                onClick={() => push(`/admin/companies/${company.slug}`)}
              >
                {company.activities
                  ? getActivities(company.activities).join(', ')
                  : '---'}
              </div>
              <div className="text-center fill-mo-error">
                {!company.item_count && (
                  <Modal
                    onConfirm={() => handleDelete(company.id)}
                    confirmTxt={'Supprimer'}
                    content={
                      <div className="flex flex-col gap-2">
                        <div>
                          Êtes-vous sûr de vouloir supprimer cette compagnie ?
                        </div>
                        <div className="flex justify-between">
                          {company.name}
                        </div>
                      </div>
                    }
                  >
                    <TrashIcon className="w-4 cursor-pointer" />
                  </Modal>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
