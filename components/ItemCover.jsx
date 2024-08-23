'use client'

import { useItem } from './Item'
import { MediaAdd } from './MediaAdd'

export function ItemCover() {
  const { item, update } = useItem()

  const handleUpdate = (partial) => {
    const keys = Object.keys(partial)
    if (keys.includes('id')) update({ cover_id: partial.id })
    if (keys.includes('file')) update({ cover: partial.file })
    if (keys.includes('url')) update({ cover_url: partial.url })
  }

  return (
    <MediaAdd
      update={handleUpdate}
      defaultImg={{
        src: item.cover_url,
        alt: item.name,
      }}
    />
  )
}
