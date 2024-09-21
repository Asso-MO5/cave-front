import { fetcher } from '@/utils/fetcher'
import { PRINT_TYPES } from './cartel.utils'
import { useState } from 'react'

export function PrintSelector({ id, name }) {
  const [loading, setLoading] = useState('')

  const handlePrint = async (type) => {
    if (loading) return
    setLoading(type)
    const ctrl = new AbortController()

    try {
      // Effectue la requête pour récupérer le fichier
      const res = await fetcher.getFile(
        `/items/${id}/print/${type}`,
        ctrl.signal
      )

      // Vérifie si la réponse est OK
      if (!res.ok) {
        throw new Error('Erreur lors de la récupération du fichier')
      }

      // Crée un lien pour télécharger le fichier
      const blob = await res.blob() // Récupère le fichier sous forme de blob
      const linkEl = document.createElement('a')
      const url = window.URL.createObjectURL(blob) // Crée un objet URL pour le blob
      linkEl.href = url
      linkEl.download = `${name}-${type}.png` // Nom du fichier à télécharger
      document.body.appendChild(linkEl)
      linkEl.click() // Déclenche le téléchargement
      document.body.removeChild(linkEl) // Retire l'élément de la page
      window.URL.revokeObjectURL(url) // Libère l'objet URL
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error)
    } finally {
      setLoading('') // Réinitialise l'état de chargement
    }
  }

  return (
    <div className="flex items-center gap-2">
      {PRINT_TYPES.map((type) => (
        <div
          key={type.name}
          className="uppercase text-xs flex items-center rounded-sm px-1 border border-mo-primary text-mo-primary gap-1 cursor-pointer hover:text-mo-white hover:bg-mo-primary"
          onClick={() => handlePrint(type.name)}
        >
          {loading === type.name ? '...' : type.name}
        </div>
      ))}
    </div>
  )
}
