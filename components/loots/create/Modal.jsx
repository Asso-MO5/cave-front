'use client'
import { Button } from '@/ui/Button'
import { Modal as ModalUi } from '@/ui/Modal'
import { useState, useRef, useEffect } from 'react'
import { Fieldset } from '@/ui/Fieldset'
import { toast } from 'react-toastify'
import { operations } from '@/_api/operations'
import { fetcher } from '@/utils/fetcher'
import { useCheckRoles } from '@/hooks/useCheckRoles'

const { roles, path } = operations.postLoots

export function Modal({ onCreate }) {
  const inputRef = useRef(null) // Créer une référence pour l'input
  const timeRef = useRef(null) // Créer une référence pour le timeout
  const display = useCheckRoles(roles)

  const [loading, setLoading] = useState(false)
  const [winnerName, setWinnerName] = useState('')

  const [loot, setLoot] = useState('1 entrée Game Story')
  const [eventId, setEventId] = useState('GS_VERSAILLES_2024')
  const [winnerEmail, setWinnerEmail] = useState('')

  const [open, setOpen] = useState(false)

  const handleClick = async (e) => {
    e?.preventDefault()
    if (loading) return
    setLoading(true)

    const ctrl = new AbortController()

    try {
      const res = await fetcher.post(path, ctrl.signal, {
        winnerName,
        winnerEmail,
        loot,
        eventId,
      })

      const resJson = await res.json()
      if (!res.ok) throw new Error(resJson?.error || 'Erreur inconnue')
      onCreate()
    } catch (e) {
      toast.error(`${e.message}`)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      const animationDuration = 400
      timeRef.current = setTimeout(() => {
        inputRef?.current?.focus()
      }, animationDuration)
    } else {
      timeRef.current && clearTimeout(timeRef.current)
      setWinnerName('')
    }
    return () => timeRef.current && clearTimeout(timeRef.current)
  }, [open])

  if (!display) return null

  return (
    <ModalUi
      onCancel={() => setOpen(false)}
      disabled={loading}
      closeModalOnConfirm={true}
      content={
        <form
          onSubmit={(closeModal) => handleClick(closeModal)}
          className="flex flex-col gap-3"
        >
          <Fieldset title="Nom du Gagnant" required>
            <input
              ref={inputRef}
              value={loading ? 'creation en cours...' : winnerName}
              onChange={(e) => setWinnerName(e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="Email du Gagnant">
            <input
              ref={inputRef}
              value={loading ? 'creation en cours...' : winnerEmail}
              onChange={(e) => setWinnerEmail(e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="ID" required>
            <input
              ref={inputRef}
              value={loading ? 'creation en cours...' : eventId}
              onChange={(e) => setEventId(e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="lot" required>
            <input
              ref={inputRef}
              value={loading ? 'creation en cours...' : loot}
              onChange={(e) => setLoot(e.target.value)}
              disabled={loading}
            />
          </Fieldset>
        </form>
      }
      onConfirm={handleClick}
      isConfirmDisabled={loading}
    >
      <Button onClick={() => setOpen(!open)}>Ajouter un gagnant</Button>
    </ModalUi>
  )
}
