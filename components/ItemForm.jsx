'use client'
import { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { Fieldset } from './Fieldset'
import { useParams, useRouter } from 'next/navigation'
import { fetcher } from '@/utils/fetcher'
import { TrashIcon } from '@/ui/icon/trash'
import { CompanySelector } from './CompanySelector'
import { dc } from '@/utils/dynamic-classes'

const Editor = dynamic(() => import('./Editor').then((c) => c.Editor), {
  ssr: false,
})

export function ItemForm({ item = {} }) {
  // ===== REFS ================================================
  const ref = useRef()
  const signal = useRef()

  // ===== STATES ==============================================
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [manufacturer, setManufacturer] = useState(item.manufacturer || {})
  const [previewCover, setPreviewCover] = useState(
    item.cover_url
      ? {
          src: item.cover_url,
          alt: item.name,
        }
      : undefined
  )
  const [isDragOver, setIsDragOver] = useState(false)

  // ===== HOOKS ==============================================
  const { type } = useParams()
  const router = useRouter()
  const toastId = useRef()

  // ===== HANDLERS ==========================================
  const handleAddCover = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewCover({
        src: reader.result,
        alt: file.name,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteCover = () => {
    setPreviewCover(null)
  }

  const handleCancel = () => {
    const uri = item.id ? '/admin/items/' + item.slug : '/admin/items'
    router.push(uri)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ref.current) return

    // ----- LOADING STATE -----------------------------------
    setLoading(true)
    toastId.current = toast.loading('Envoi de la requête en cours 🚀', {
      id: 'item-form',
    })

    // ----- FORM DATA ---------------------------------------
    const controller = new AbortController()
    signal.current = controller.signal
    const form = new FormData(ref.current)

    if (!form.get('name')) return toast.warning('Nom obligatoire')

    if (item.id) form.append('id', item.id)
    if (manufacturer?.id) form.append('manufacturer', manufacturer.id)

    if (!form.get('medias_url')) form.delete('medias_url')
    if (!form.get('release_year')) form.delete('release_year')
    form.append('description', JSON.stringify(description))

    // ----- API CALL ----------------------------------------
    try {
      const res = await fetcher[item.id ? 'put' : 'post'](
        '/items?type=' + type,
        signal.current,
        form
      )

      const newItem = await res.json()

      if (res.status > 201) {
        toast.update(toastId.current, {
          render: newItem.error || 'Erreur lors de la création de la item',
          isLoading: false,
          type: 'error',
          autoClose: 5000,
          closeButton: true,
        })
        return
      }
      toast.update(toastId.current, {
        render: 'item créée avec succès 🎉',
        isLoading: false,
        type: 'success',
        autoClose: 5000,
        closeButton: true,
      })
      return router.push('/admin/item/' + newItem.slug)
    } catch (err) {
      toast.update(toastId.current, {
        render: typeof err === 'string' ? err : err.message,
        isLoading: false,
        type: 'error',
        autoClose: 5000,
        closeButton: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleAddCover(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  // ===== EFFECTS ===========================================
  useEffect(() => {
    return () => {
      if (signal.current) signal?.current?.abort?.()
    }
  }, [])

  // ===== RENDER ============================================
  return (
    <form className="flex flex-col gap-2" ref={ref} onSubmit={handleSubmit}>
      <Fieldset title="Nom" required>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={item.name || ''}
        />
      </Fieldset>
      {type === 'item' && (
        <Fieldset title="Fabricant">
          <CompanySelector
            onSelect={setManufacturer}
            defaultValue={item.manufacturer}
            type={'manufacturer'}
          />
        </Fieldset>
      )}

      <Fieldset title="Image">
        <div
          className={dc(
            'border border-dashed border-mo-primary p-2 cursor-pointer text-center transition-all',
            [isDragOver, 'border-mo-valid']
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <label htmlFor="cover_image" className="cursor-pointer">
            Ajouter une image
          </label>
          <input
            type="file"
            id="cover_image"
            name="cover_image"
            className="hidden"
            onChange={(e) => handleAddCover(e.target.files[0])}
          />
        </div>
      </Fieldset>

      {previewCover?.src && (
        <div className="flex justify-center relative items-center h-28 m-auto">
          <img
            src={previewCover.src}
            alt={previewCover.alt}
            className="h-28 w-auto"
          />
          <button
            onClick={handleDeleteCover}
            className="absolute -top-1 -right-1 fill-white bg-mo-error w-6 h-6 rounded-full items-center justify-center flex transition-transform hover:scale-110"
          >
            <TrashIcon className="h-4" />
          </button>
        </div>
      )}

      <Fieldset title="Année de sortie">
        <input
          id="release_year"
          type="text"
          name="release_year"
          defaultValue={item.release_year || ''}
          onChange={(e) => {
            if (e.target.value.length > 4)
              e.target.value = e.target.value.slice(0, 4)
          }}
        />
      </Fieldset>

      <Fieldset title="Description">
        <Editor
          onChange={setDescription}
          defaultValue={item.description || ''}
          id={`description-${item.id || 'new'}`}
        />
      </Fieldset>

      <div className="flex gap-2 justify-between">
        <button className="btn" type="submit" disabled={loading}>
          {item.id ? 'Modifier' : 'Enregistrer'}
        </button>

        <button className="btn-cancel" type="cancel" onClick={handleCancel}>
          Annuler
        </button>
      </div>
    </form>
  )
}
