'use client'
import { Button } from '@/ui/Button'
import { useItem } from './Item'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { useRef, useState } from 'react'
import { Fieldset } from './Fieldset'

export function ItemReleaseYear() {
  const { item, update } = useItem()
  const [release_year, setRelease_year] = useState(item.release_year || '')
  const ref = useRef()

  const handleChange = (e) => {
    //only allow numbers
    e.target.value = e.target.value.replace(/\D/g, '')
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4)
    }
  }

  const handleSubmit = async (e, close) => {
    e.preventDefault()
    if (!ref?.current) return
    console.log('submit')
    const oldRelease_year = release_year
    const form = new FormData(ref.current)
    const newRelease_year = form.get('release_year')

    setRelease_year(newRelease_year)
    update({ release_year: newRelease_year }).catch(() =>
      setRelease_year(oldRelease_year)
    )
    close()
  }

  return (
    <ReadAndEdit
      read={() => (
        <Fieldset title="Année de sortie">
          <div className="font-bold text-mo-text">
            {release_year || 'Non renseignée'}
          </div>
        </Fieldset>
      )}
      edit={(close) => (
        <Fieldset title="Année de sortie">
          <form
            className="flex flex-col gap-2"
            ref={ref}
            onSubmit={(e) => handleSubmit(e, close)}
          >
            <input
              type="text"
              className="w-full"
              id="release_year"
              name="release_year"
              defaultValue={release_year}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <Button onClick={close} theme="secondary">
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Fieldset>
      )}
    />
  )
}
