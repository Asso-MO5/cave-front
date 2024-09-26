import { Button } from '@/ui/Button'
import { Tabs } from '@/ui/Tabs'
import { MediaAddGallery } from './MediaAddGallery'
import { MediaAddLocal } from './MediaAddLocal'
import { DistantMedia } from './DistantMedia'
import { useState } from 'react'

export function AddBtn({ updateUrl, updateId, updateLocal }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleUpdateUrl = (url) => {
    updateUrl?.(url)
    handleClose()
  }

  const handleUpdateId = (medias) => {
    const { id } = medias[0]
    updateId?.(id)
    handleClose()
  }

  const handleUpdateLocal = (file) => {
    updateLocal?.(file)
    handleClose()
  }

  if (!open)
    return <Button onClick={() => setOpen(true)}>Ajouter un media</Button>
  return (
    <Tabs
      disabledquery
      tabs={[
        {
          key: 'galerie',
          label: 'Galerie',
          content: (
            <MediaAddGallery
              onSubmit={(media) => handleUpdateId(media, close)}
              close={handleClose}
            />
          ),
        },
        {
          key: 'upload',
          label: 'Charger',
          content: (
            <MediaAddLocal close={handleClose} update={handleUpdateLocal} />
          ),
        },
        {
          key: 'url',
          label: 'Lien',
          content: (
            <DistantMedia close={handleClose} onSubmit={handleUpdateUrl} />
          ),
        },
      ]}
    />
  )
}
