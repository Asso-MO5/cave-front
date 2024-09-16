'use client'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { Tabs } from '@/ui/Tabs'
import { useState } from 'react'
import { DistantMedia } from './DistantMedia'
import { MediaAddLocal } from './MediaAddLocal'
import { MediaAddGallery } from './MediaAddGallery'

export function MediaAdd({
  updateUrl,
  updateId,
  updateLocal,

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

  return (
    <ReadAndEdit
      read={() => (
        <div className="flex justify-center items-center overflow-hidden">
          {img?.src ? (
            <img src={img.src} alt={img.alt} className="h-full w-auto" />
          ) : (
            <div className="italic">aucune image définie</div>
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
            ]}
          />
        </div>
      )}
    />
  )
}
