'use client'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { useEffect, useId, useState } from 'react'
import { locales } from '@blocknote/core'
import { editorInitialContent } from '@/utils/editor-initial-content'
import { useDebounce } from '@/hooks/useDebounce'
import { EditorRead } from './EditorRead'

export function Editor({ onChange, id, defaultValue = '', disabled, limits }) {
  // ==== EDITOR ========================================
  const idGen = useId()
  const [init, setInit] = useState(false)
  const [blocks, setBlocks] = useState(editorInitialContent(defaultValue))
  const debounceBlocks = useDebounce(blocks, 1500)
  const charCount =
    blocks?.reduce((acc, block) => {
      block?.content?.forEach((content) => {
        if (content?.text?.length) acc += content.text.length
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
      <div className="text-right text-xs  flex gap-1 items-center justify-end">
        {limits
          .filter((limit) => limit[id] > 0)
          .map((limit) => (
            <div
              key={limit.name}
              className="p-1 flex items-center gap-1 border border-black/5 rounded-sm"
            >
              <span className="text-mo-primary font-bold first-letter:uppercase">
                {limit.name}
              </span>

              <span className="text-mo-primary">
                <span
                  className="data-[warning=true]:text-yellow-500 data-[exceed=true]:text-red-500 text-mo-primary"
                  data-exceed={charCount > limit[id]}
                  data-warning={
                    charCount > limit[id] - limit[id] / 15 &&
                    charCount <= limit[id]
                  }
                >
                  {charCount}
                </span>{' '}
                / {limit[id]}
              </span>
            </div>
          ))}
      </div>
    </>
  )
}
