'use client'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { useId } from 'react'
import { locales } from '@blocknote/core'

export function Editor({ onChange, id, defaultValue = '' }) {
  const idGen = useId()
  const editor = useCreateBlockNote({
    theme: 'light',
    dictionary: locales.fr,
    toolbar: ['bold', 'italic', 'underline', 'link', 'image', 'quote', 'code'],
  })

  if (!editor) return null

  return (
    <BlockNoteView
      editor={editor}
      name="description"
      theme="light"
      onChange={onChange}
      defaultValue={defaultValue}
      id={id || idGen}
    />
  )
}
