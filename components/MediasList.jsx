'use client'

import { GetMediasLightService } from '@/_api/GetMediasLightService.mjs'
import { useApi } from '@/hooks/useApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { VirtuosoGrid } from 'react-virtuoso'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { Tabs } from '@/ui/Tabs'
import { MediaAddLocal } from './MediaAddLocal'
import { DistantMedia } from './DistantMedia'
import { PostMediasService } from '@/_api/PostMediasService.mjs'
import { toast } from 'react-toastify'

function Item({ children, ...props }) {
  return (
    <div
      {...props}
      className="flex justify-center p-1 lg:w-1/12 md:w-1/6 w-1/4"
    >
      {children}
    </div>
  )
}

const gridComponents = {
  List: forwardRef(function List({ children, ...props }, ref) {
    return (
      <div ref={ref} {...props} className="flex flex-wrap">
        {children}
      </div>
    )
  }),
  Item,
}

function ImageWrapper({ children, ...props }) {
  return (
    <div
      {...props}
      className="w-full relative overflow-hidden bg-mo-bg pt-[100%]"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export function MediaList() {
  const { push } = useRouter()
  const search = useSearchParams()
  const toastId = useRef()

  const tab = search.get('tab')

  const { data, error, loading, refetch } = useApi(GetMediasLightService, {
    query: {
      search: '',
    },
  })

  const { mutate } = useApi(PostMediasService, {
    autoFetch: false,
  })

  const imgs = useMemo(
    () => data?.filter((d) => d.type.match(/image/)) || [],
    [data]
  )

  const handleSend = async (key, data) => {
    const formData = new FormData()
    formData.append(key, data)
    toastId.current = toast.loading('Envoi de la requête en cours 🚀', {
      id: 'item-form',
    })

    try {
      await mutate({ formData })
      push(`/admin/medias?tab=galerie`)
      toast.update(toastId.current, {
        render: 'Média ajouté avec succès 🎉',
        isLoading: false,
        type: 'success',
        autoClose: 5000,
        closeButton: true,
      })
      return
    } catch (err) {
      toast.update(toastId.current, {
        render: newItem.error || "Erreur lors de l'envoi",
        isLoading: false,
        type: 'error',
        autoClose: 5000,
        closeButton: true,
      })
    } finally {
      toast.dismiss(toastId.current)
    }
  }
  const handleUpdateUrl = (url) => {
    handleSend('url', url)
  }

  const handleUpdateLocal = (file) => {
    handleSend('file', file)
  }

  useEffect(() => {
    if (tab === 'galerie' && !loading) refetch()
  }, [tab])

  if (error)
    return (
      <div className="text-center text-mo-error">Erreur: {error.message}</div>
    )

  if (loading)
    return <div className="flex items-center justify-center">Chargement...</div>

  if (!loading && Array.isArray(data) && data?.length === 0)
    return (
      <div className="text-center h-full flex justify-center items-center font-secondary font-bold">
        Aucun media trouvé
      </div>
    )

  return (
    <div className="grid grid-rows-[auto_1fr] gap-2 h-full">
      <Tabs
        tabs={[
          {
            key: 'galerie',
            label: 'Galerie',
            content: (
              <VirtuosoGrid
                style={{ height: '100%' }}
                totalCount={imgs.length}
                components={gridComponents}
                itemContent={(index) => (
                  <ImageWrapper>
                    <img
                      //  onClick={() => handleSelect(index)}
                      src={imgs[index].url}
                      alt={imgs[index].name}
                      className="w-full h-full object-cover cursor-pointer transition-all"
                    />
                  </ImageWrapper>
                )}
              />
            ),
          },
          {
            key: 'upload',
            label: 'Ajouter un média local',
            content: (
              <div className="max-w-lg mx-auto">
                <MediaAddLocal update={handleUpdateLocal} hideControl />
              </div>
            ),
          },
          {
            key: 'url',
            label: 'Ajouter un média distant',
            content: (
              <div className="max-w-lg mx-auto">
                <DistantMedia onSubmit={handleUpdateUrl} />
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}