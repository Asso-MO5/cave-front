'use client'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { useId } from 'react'
import { locales } from '@blocknote/core'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { decimalToHex } from '@/utils/decimalToHex'

const doc = new Y.Doc()

export function Editor({ onChange, id, defaultValue = '', session }) {
  // ==== COLLABORATION ========================================
  const wsProvider = session
    ? new WebsocketProvider(
        process.env.NEXT_PUBLIC_EDITOR_URL,
        'editor/' + id,
        doc
      )
    : undefined

  const collaboration = session
    ? {
        provider: wsProvider,
        fragment: doc.getXmlFragment('document-store'),
        user: {
          name: session.user.name,
          color: decimalToHex(
            session.user.roles.filter((r) => r.color > 0)[0].color
          ),
        },
      }
    : undefined

  // ==== EDITOR ========================================
  const idGen = useId()
  const editor = useCreateBlockNote({
    theme: 'light',
    dictionary: locales.fr,
    collaboration,
    toolbar: ['bold', 'italic', 'underline', 'link', 'image', 'quote', 'code'],
    initialContent: defaultValue,
  })

  // ==== RENDER ========================================

  if (!editor) return null

  return (
    <BlockNoteView
      editor={editor}
      name="description"
      theme="light"
      onChange={() => onChange(editor.document)}
      id={id || idGen}
    />
  )
}
