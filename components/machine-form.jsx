'use client'

import { useRef, useState, Rotate, useEffect } from 'react'
import { toast } from 'react-toastify'
import ManufacturersSelector from './manufacturers-selector'
import dynamic from 'next/dynamic'
import { Fieldset } from './fieldset'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/utils/fetcher'

const Editor = dynamic(() => import('./editor').then((c) => c.Editor), {
  ssr: false,
})

export function MachineForm({ machine = {}, session }) {
  const ref = useRef()
  const signal = useRef()
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [manufacturer, setManufacturer] = useState(machine.manufacturer || {})
  const router = useRouter()
  const toastId = useRef()

  const defaultMachine = {
    id: '',
    name: '',
    release_year: '',
    brand: '',
    type: '',
    description: '',
    image: '',
    ...machine,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ref.current) return
    const controller = new AbortController()
    signal.current = controller.signal
    setLoading(true)
    const form = new FormData(ref.current)

    const name = form.get('name')
    if (!name) return toast.warning('Nom obligatoire')

    if (!form.get('medias_url')) form.delete('medias_url')
    if (!form.get('release_year')) form.delete('release_year')

    if (manufacturer?.id) form.append('manufacturer', manufacturer.id)

    form.append('description', JSON.stringify(description))

    toastId.current = toast.loading('Envoi de la requête en cours 🚀', {
      id: 'machine-form',
    })

    try {
      const res = await fetcher.post('/machines', signal.current, form)
      toast.update(toastId.current, {
        render: 'Machine créée avec succès 🎉',
        isLoading: false,
        type: 'success',
        transition: Rotate,
        autoClose: 5000,
        closeButton: true,
      })

      const newItem = await res.json()

      return router.push('/admin/machines/' + newItem.slug)
    } catch (err) {
      toast.update(toastId.current, {
        render: err,
        isLoading: false,
        type: 'error',
        transition: Rotate,
        autoClose: 5000,
        closeButton: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (signal.current) signal.current.abort()
    }
  }, [])

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

      <ManufacturersSelector
        onSelect={setManufacturer}
        defaultValue={machine.manufacturer}
      />

      <Fieldset title="Année de sortie">
        <input
          id="release_year"
          type="text"
          name="release_year"
          defaultValue={defaultMachine.release_year}
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

      {/* 
       <Fieldset title="Autre médias">
        <div>local</div>
        <input type="file" multiple id="medias" name="medias" />
        <div>url (un part ligne)</div>
        <input type="url" id="medias_url" name="medias_url" />
        <div>TODO ajouter des inputs pour ajouter des sources url</div>
      </Fieldset>
      */}
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
