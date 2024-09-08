'use client'

import { MediaAdd } from './MediaAdd'

export function MediaReadEdit({ url, name, update }) {
  return (
    <MediaAdd
      update={update}
      defaultImg={{
        src: url,
        alt: name,
      }}
    />
  )
}
