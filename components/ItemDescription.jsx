'use client'
import { Button } from '@/ui/Button'
import { useItem } from './Item'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { Suspense, useRef, useState } from 'react'

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

export function ItemDescription() {
  const { item, update } = useItem()
  const [description, setDescription] = useState(item.description)
  const [desc, setDesc] = useState(item.description)
  const ref = useRef()

  const handleSubmit = async (e, close) => {
    e.preventDefault()
    const oldDesc = description

    console.log('description', desc)
    setDescription(desc)
    update({ description: desc }).catch(() => setDescription(oldDesc))
    close()
  }

  return (
    <ReadAndEdit
      read={() =>
        description ? (
          <Suspense fallback={<div>Chargement...</div>}>
            <EditorRead value={description} key={description} />
          </Suspense>
        ) : (
          <div className="italic text-mo-text">Aucune description</div>
        )
      }
      edit={(close) => (
        <form
          className="flex flex-col gap-2"
          ref={ref}
          onSubmit={(e) => handleSubmit(e, close)}
        >
          <Suspense fallback={<div>Chargement...</div>}>
            <Editor
              onChange={setDesc}
              defaultValue={description || ''}
              id={`description-${item.id}`}
              key={description}
            />
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
