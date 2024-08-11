'use client'
import { useCreateBlockNote } from '@blocknote/react'
import { locales } from '@blocknote/core'
import { useEffect, useRef } from 'react'
import { editorInitialContent } from '@/utils/editor-initial-content'

export function EditorRead({ value = undefined, inText = false }) {
  const ref = useRef(null)
  // ==== EDITOR ========================================

  const editor = useCreateBlockNote({
    theme: 'light',
    dictionary: locales.fr,

    _headless: true,
  })

  useEffect(() => {
    if (!editor) return
    if (!value) return
    editor.blocksToFullHTML(editorInitialContent(value)).then((html) => {
      if (inText) {
        const text = document.createElement('div')
        text.innerHTML = html
        ref.current.innerText = text.innerText
        return
      }
      ref.current.innerHTML = html
    })
  }, [editor, value])
  // ==== RENDER ========================================

  if (!editor) return null

  if (inText) return <span ref={ref} />
  return <div ref={ref} />
}
