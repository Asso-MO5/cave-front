'use client'
import { Button } from '@/ui/button'
import { useItem } from './item'
import { ReadAndEdit } from '@/ui/read-and-edit'
import { useRef, useState } from 'react'

export function ItemName() {
  const { item, update } = useItem()
  const [name, setName] = useState(item.name)
  const ref = useRef()

  const handleSubmit = async (e, close) => {
    e.preventDefault()
    const oldName = name
    const form = new FormData(ref.current)
    const newName = form.get('name')

    setName(newName)
    update({ name: newName }).catch(() => setName(oldName))
    close()
  }

  return (
    <ReadAndEdit
      read={() => <h2 className="font-bold text-2xl text-mo-text">{name}</h2>}
      edit={(close) => (
        <form
          className="flex flex-col gap-2"
          ref={ref}
          onSubmit={(e) => handleSubmit(e, close)}
        >
          <input
            type="text"
            className="w-full"
            id="name"
            name="name"
            defaultValue={name}
            onChange={(e) => (item.name = e.target.value)}
          />
          <div className="flex gap-2">
            <Button type="cancel" onClick={close} className="btn btn-secondary">
              Annuler
            </Button>
            <Button type="submit" className="btn btn-primary">
              Enregistrer
            </Button>
          </div>
        </form>
      )}
    />
  )
}
