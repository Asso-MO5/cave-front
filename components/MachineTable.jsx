'use client'
import { API } from '@/api/api'
import { useCave } from '@/hooks/useCave'
import { useRouter } from 'next/navigation'

export function MachineTable() {
  const { push } = useRouter()
  const { data, error, loading } = useCave(API.items, {
    query: {
      limit: 100000,
      type: 'machine',
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
        Aucune machine trouvée
      </div>
    )

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <div className="grid grid-cols-[4fr_1fr_2fr] gap-2 sticky top-1 bg-mo-bg font-bold text-mo-primary mt-2 text-center">
        {['Nom', 'Année de sortie', 'Fabricant'].map((header) => (
          <div key={header} className="truncate">
            {header}
          </div>
        ))}
      </div>
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto">
          {data?.map((machine) => (
            <div
              key={machine.slug}
              className="grid grid-cols-[4fr_1fr_2fr] gap-2 hover:text-mo-primary cursor-pointer odd:bg-black/5 p-1"
              onClick={() => push(`/admin/machine/${machine.slug}`)}
            >
              <div className="first-letter:uppercase font-bold">
                {machine.name}
              </div>
              <div className="text-center">{machine.release_year || '---'}</div>
              <div className="text-center">{machine.manufacturer || '---'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
