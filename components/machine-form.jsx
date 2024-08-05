'use client'

import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { redirect } from 'next/dist/server/api-utils'
import ManufacturersSelector from './manufacturers-selector'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('./editor').then((c) => c.Editor), {
  ssr: false,
})

export function MachineForm({ machine = {}, session }) {
  const ref = useRef()
  const [description, setDescription] = useState('')

  const defaultMachine = {
    name: '',
    year: '',
    brand: '',
    type: '',
    description: '',
    image: '',
    ...machine,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ref.current) return

    const form = new FormData(ref.current)

    const name = form.get('name')
    if (!name) return toast.warning('Nom obligatoire')
    form.append('description', JSON.stringify(description))
    form.append('author_id', session.user.id)

    const year = form.get('year')
    if (!year) form.delete('year')

    const signal = new AbortController().signal

    toast.success('Machine enregistrée')
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/machines', {
        method: 'POST',
        signal,

        body: form,
      })
      // redirect('/admin/machine/' + res.slug)
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className="flex flex-col gap-2" ref={ref}>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={defaultMachine.name}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="cover_image">image</label>
        <input type="file" id="cover_image" name="cover_image" />
      </fieldset>

      <ManufacturersSelector />

      <fieldset className="flex flex-col gap-2">
        <label htmlFor="release_year">Année de sortie</label>
        <input
          id="release_year"
          type="text"
          name="release_year"
          defaultValue={defaultMachine.year}
          onChange={(e) => {
            if (e.target.value.length > 4) {
              e.target.value = e.target.value.slice(0, 4)
            }
          }}
        />
      </fieldset>

      <Editor
        session={session}
        onChange={setDescription}
        defaultValue={defaultMachine.description}
        id="description"
      />
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="medias">autres medias</label>
        <input type="file" multiple id="medias" name="medias" />
        <div>TODO ajouter des inputs pour ajouter des sources url</div>
      </fieldset>
      <div>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Enregistrer
        </button>
      </div>
    </form>
  )
}
