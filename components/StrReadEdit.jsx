'use client'
import { Button } from '@/ui/Button'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { useRef, useState } from 'react'

export function StrReadEdit({ update, defaultValue }) {
  const [value, setValue] = useState(defaultValue)
  const ref = useRef()

  const handleSubmit = async (e, close) => {
    e.preventDefault()
    const oldValue = value
    const form = new FormData(ref.current)
    const newName = form.get('name')

    setValue(newName)
    update(value).catch(() => setValue(oldValue))
    close()
  }

  return (
    <ReadAndEdit
      read={() => <h2 className="font-bold text-2xl text-mo-text">{value}</h2>}
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
            defaultValue={defaultValue}
            onChange={(e) => setValue(e.target.value)}
          />
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
