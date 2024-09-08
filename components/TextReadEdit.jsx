'use client'
import { Button } from '@/ui/Button'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { Suspense, useId, useRef, useState } from 'react'

import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('./Editor').then((c) => c.Editor), {
  ssr: false,
})

const EditorRead = dynamic(
  () => import('./EditorRead').then((c) => c.EditorRead),
  {
    ssr: false,
  }
)

export function TextReadEdit({ update, defaultValue, id = null }) {
  const idGen = useId()
  const ID = id || idGen
  const [savedText, setSavedText] = useState(defaultValue)
  const [text, setText] = useState(defaultValue)
  const ref = useRef()

  const handleSubmit = async (e, close) => {
    e.preventDefault()
    const oldText = savedText

    setSavedText(text)
    update(text).catch(() => setSavedText(oldText))
    close()
  }

  return (
    <ReadAndEdit
      read={() =>
        text ? (
          <Suspense fallback={<div>Chargement...</div>}>
            <EditorRead value={savedText} key={savedText} />
          </Suspense>
        ) : (
          <div className="italic text-mo-text">---</div>
        )
      }
      edit={(close) => (
        <form
          className="flex flex-col gap-2"
          ref={ref}
          onSubmit={(e) => handleSubmit(e, close)}
        >
          <Suspense fallback={<div>Chargement...</div>}>
            <Editor onChange={setText} defaultValue={savedText || ''} id={ID} />
          </Suspense>
          <div className="flex gap-2">
            <Button onClick={close} theme="secondary">
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      )}
    />
  )
}
