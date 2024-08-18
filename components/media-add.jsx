import { ReadAndEdit } from '@/ui/read-and-edit'
import { Tabs } from '@/ui/tabs'
import { useState } from 'react'
import { DistantMedia } from './media-add-distant'
import { MediaAddLocal } from './media-add-local'
import { MediaAddGallery } from './media-add-gallery'

export function MediaAdd({
  update,
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
    update?.({ url })
  }

  const handleUpdateId = (medias, close) => {
    const { id, url } = medias[0]
    setImg({
      src: url,
      alt: 'media',
    })
    update?.({ id })
    close()
  }

  const handleUpdateLocal = (file, newImg) => {
    setImg(newImg)
    update?.({ file })
  }

  return (
    <ReadAndEdit
      read={() => (
        <div className="item-cover">
          {img?.src ? (
            <img src={img.src} alt={img.alt} className="w-auto h-56" />
          ) : (
            <div className="italic">aucune image définie</div>
          )}
        </div>
      )}
      edit={(close) => (
        <div>
          <Tabs
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
