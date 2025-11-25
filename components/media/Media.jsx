'use client'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { Tabs } from '@/ui/Tabs'
import { useState } from 'react'
import { DistantMedia } from './DistantMedia'
import { MediaAddLocal } from './MediaAddLocal'
import { MediaAddGallery } from './MediaAddGallery'
import { DeleteMedia } from './DeleteMedia'
import { MediaSelector } from './MediaSelector'

export function Media({
  updateUrl,
  updateId,
  updateLocal,
  deleteMedia,

  // =================================================
  defaultImg = {
    src: '',
    alt: '',
  },
}) {
  const [img, setImg] = useState(defaultImg)

  const handleUpdateUrl = (url) => {
    setImg({
      src: url,
      alt: 'media',
    })
    updateUrl?.(url)
  }

  const handleUpdateId = (medias, close) => {
    const { id, url } = medias[0]
    setImg({
      src: url,
      alt: 'media',
    })
    updateId?.(id)
    close()
  }

  const handleUpdateLocal = (file, newImg) => {
    setImg(newImg)
    updateLocal?.(file)
  }

  const handleDelete = () => {
    setImg({
      src: '',
      alt: '',
    })
    deleteMedia?.()
  }

  return (
    <ReadAndEdit
      read={() => (
        <div className="h-full overflow-hidden">
          {img?.src ? (
            <div className="flex justify-center h-full items-center">
              <MediaSelector url={img.src} onError={() => setImg(defaultImg)} />
            </div>
          ) : (
            <div className="italic">aucun media définie</div>
          )}
        </div>
      )}
      edit={(close) => (
        <div>
          <Tabs
            disabledquery
            tabs={[
              {
                key: 'galerie',
                label: 'Galerie',
                content: (
                  <MediaAddGallery
                    deleteMedia={deleteMedia}
                    onSubmit={(media) => handleUpdateId(media, close)}
                    close={close}
                  />
                ),
              },
              {
                key: 'upload',
                label: 'Charger',
                content: (
                  <MediaAddLocal
                    defaultImg={defaultImg}
                    close={close}
                    update={handleUpdateLocal}
                  />
                ),
              },
              {
                key: 'url',
                label: 'Lien',
                content: (
                  <DistantMedia close={close} onSubmit={handleUpdateUrl} />
                ),
              },
              {
                key: 'delete',
                label: 'Supprimer',
                content: <DeleteMedia close={close} onSubmit={handleDelete} />,
              },
            ]}
          />
        </div>
      )}
    />
  )
}
