'use client'
import { useCreateBlockNote } from '@blocknote/react'
import { locales } from '@blocknote/core'
import { useEffect, useRef } from 'react'

export function EditorRead({ value = undefined, inText = false }) {
  const ref = useRef(null)
  // ==== EDITOR ========================================
  const initialContent = () => {
    if ((typeof value === 'string') & (value.charAt(0) === '['))
      try {
        return JSON.parse(value)
      } catch (error) {
        console.error('Error parsing JSON:', error)
        return [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]
      }

    if (Array.isArray(value)) return value
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]
  }

  const editor = useCreateBlockNote({
    theme: 'light',
    dictionary: locales.fr,
    // initialContent: initialContent(),
    _headless: true,
  })

  useEffect(() => {
    if (!editor) return
    if (!value) return
    editor.blocksToFullHTML(initialContent()).then((html) => {
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
