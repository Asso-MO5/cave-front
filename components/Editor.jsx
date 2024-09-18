'use client'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { useEffect, useId, useState } from 'react'
import { locales } from '@blocknote/core'
import { editorInitialContent } from '@/utils/editor-initial-content'
import { useDebounce } from '@/hooks/useDebounce'
import { EditorRead } from './EditorRead'

export function Editor({ onChange, id, defaultValue = '', disabled }) {
  // ==== EDITOR ========================================
  const idGen = useId()
  const [init, setInit] = useState(false)
  const [blocks, setBlocks] = useState(editorInitialContent(defaultValue))
  const debounceBlocks = useDebounce(blocks, 1500)
  const charCount =
    blocks?.reduce((acc, block) => {
      block?.content?.forEach((content) => {
        acc += content.text.length
      })

      return acc
    }, 0) || 0

  const editor = useCreateBlockNote({
    theme: 'light',
    dictionary: locales.fr,
    toolbar: ['bold', 'italic', 'underline', 'link', 'image', 'quote', 'code'],
    initialContent: blocks,
  })

  useEffect(() => {
    if (init) onChange(debounceBlocks)
  }, [debounceBlocks])

  // ==== RENDER ========================================

  if (!editor) return null

  if (disabled) return <EditorRead value={blocks} />
  return (
    <>
      <BlockNoteView
        editor={editor}
        className="min-h-20 z-0 text-mo-text"
        name="description"
        theme="light"
        style={{
          backgroundColor: 'transparent',
          padding: '0',
        }}
        onChange={() => {
          setInit(true)
          setBlocks(editor.document)
        }}
        id={id || idGen}
      />
      <div className="text-right text-sm italic text-mo-primary opacity-50">
        {charCount} caractère{charCount > 1 ? 's' : ''}
      </div>
    </>
  )
}
