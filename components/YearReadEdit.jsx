'use client'
import { Button } from '@/ui/Button'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { useId, useRef, useState } from 'react'
import { Fieldset } from '../ui/Fieldset'

export function YearReadEdit({ defaultValue, update, label }) {
  const id = useId()
  const [year, setYear] = useState(defaultValue || '')
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
    const oldYear = year
    const form = new FormData(ref.current)
    const newYear = form.get(id)

    setYear(newYear)
    update(newYear).catch(() => setYear(oldYear))
    close()
  }

  return (
    <ReadAndEdit
      read={() => (
        <Fieldset title={label}>
          <div className="font-bold text-mo-text">
            {year || 'Non renseignée'}
          </div>
        </Fieldset>
      )}
      edit={(close) => (
        <Fieldset title={label}>
          <form
            className="flex flex-col gap-2"
            ref={ref}
            onSubmit={(e) => handleSubmit(e, close)}
          >
            <input
              type="text"
              className="w-full"
              id={id}
              name={id}
              defaultValue={year}
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
