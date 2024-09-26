'use client'
import { Button } from '@/ui/Button'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { MediaSelector } from './MediaSelector'

export function DistantMedia({ close, onSubmit }) {
  const [url, setUrl] = useState('')

  const [error, setError] = useState(false)

  const handleErrors = () => {
    setError(true)
    toast.error("Erreur lors du chargement de l'image")
  }

  const handleChange = (e) => {
    setError(false)
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!url || error) return
    onSubmit?.(url)
    close?.()
  }

  return (
    <form className="m-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <MediaSelector url={url} onError={handleErrors} />
      <input
        type="text"
        placeholder="URL"
        className="border border-gray-300 w-full"
        value={url}
        onChange={handleChange}
      />
      <div className="flex gap-2 justify-end">
        <Button theme="secondary" onClick={close}>
          Annuler
        </Button>
        <Button type="submit" disabled={error}>
          Valider
        </Button>
      </div>
    </form>
  )
}