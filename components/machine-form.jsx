'use client'

import { useRef, useState, Rotate } from 'react'
import { toast } from 'react-toastify'

import ManufacturersSelector from './manufacturers-selector'
import dynamic from 'next/dynamic'
import { Fieldset } from './fieldset'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

const Editor = dynamic(() => import('./editor').then((c) => c.Editor), {
  ssr: false,
})

export function MachineForm({ machine = {}, session }) {
  const ref = useRef()
  const [description, setDescription] = useState('')
  const { push } = useRouter()
  const toastId = useRef()
  const signal = new AbortController().signal

  const defaultMachine = {
    id: '',
    name: '',
    year: '',
    brand: '',
    type: '',
    description: '',
    image: '',
    ...machine,
  }

  const { mutate, loading } = useMutation({
    queryKey: ['MachineForm'],
    mutationFn: (body) =>
      fetch(process.env.NEXT_PUBLIC_API_URL + '/machines', {
        method: 'POST',
        signal,
        headers: {
          Authorization: 'Bearer ' + session.api_token,
        },
        body,
      }).then((res) => res.json()),
    onError: (err) => {
      toast.update(toastId.current, {
        render: err,
        isLoading: false,
        type: 'error',
        transition: Rotate,
        autoClose: 5000,
        closeButton: true,
      })
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        render: 'Machine créée avec succès 🎉',
        isLoading: false,
        type: 'success',
        transition: Rotate,
        autoClose: 5000,
        closeButton: true,
      })
      console.log(data)
      push('/admin/machines/' + data.slug)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ref.current) return

    const form = new FormData(ref.current)

    const name = form.get('name')
    if (!name) return toast.warning('Nom obligatoire')

    if (!form.get('medias_url')) form.delete('medias_url')
    if (!form.get('year')) form.delete('year')

    form.append('description', JSON.stringify(description))

    toastId.current = toast.loading('Envoi de la requête en cours 🚀', {
      id: 'machine-form',
    })

    mutate(form)
  }

  return (
    <form className="flex flex-col gap-2" ref={ref}>
      <Fieldset title="Nom" required>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={defaultMachine.name}
        />
      </Fieldset>

      <Fieldset title="Image">
        <input type="file" id="cover_image" name="cover_image" />
      </Fieldset>

      <ManufacturersSelector />

      <Fieldset title="Année de sortie">
        <input
          id="release_year"
          type="text"
          name="release_year"
          defaultValue={defaultMachine.year}
          onChange={(e) => {
            if (e.target.value.length > 4)
              e.target.value = e.target.value.slice(0, 4)
          }}
        />
      </Fieldset>

      <Fieldset title="Description">
        <Editor
          session={machine.id ? session : undefined}
          onChange={setDescription}
          defaultValue={defaultMachine.description}
          id={`description-${defaultMachine.id || 'new'}`}
        />
      </Fieldset>

      <Fieldset title="Autre médias">
        <div>local</div>
        <input type="file" multiple id="medias" name="medias" />
        <div>url (un part ligne)</div>
        <input type="url" id="medias_url" name="medias_url" />
        <div>TODO ajouter des inputs pour ajouter des sources url</div>
      </Fieldset>
      <div>
        <button
          className="btn"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          Enregistrer
        </button>
      </div>
    </form>
  )
}
