'use client'
import { Button } from '@/ui/Button'
import { Modal as ModalUi } from '@/ui/Modal'
import { useState, useRef, useEffect } from 'react'
import { Fieldset } from '@/ui/Fieldset'
import { toast } from 'react-toastify'
import { operations } from '@/_api/operations'
import { fetcher } from '@/utils/fetcher'
import { useCheckRoles } from '@/hooks/useCheckRoles'
import { useRouter } from 'next/navigation'

const { roles, path } = operations.postItems

export function Modal() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null) // Créer une référence pour l'input
  const timeRef = useRef(null) // Créer une référence pour le timeout
  const display = useCheckRoles(roles)
  const router = useRouter()

  const handleClick = async (e) => {
    e?.preventDefault()
    setLoading(true)

    const ctrl = new AbortController()

    try {
      const res = await fetcher.post(path, ctrl.signal, {
        name,
        type: 'cartel',
      })

      const resJson = await res.json()
      if (!res.ok) throw new Error(resJson?.error || 'Erreur inconnue')
      router.push('/admin/cartels/' + resJson.id)
    } catch (e) {
      toast.error(`${e.message}`)
    } finally {
      setLoading(false)
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
    }
    return () => timeRef.current && clearTimeout(timeRef.current)
  }, [open])

  if (!display) return null

  return (
    <ModalUi
      onCancel={() => setOpen(false)}
      content={
        <form onSubmit={handleClick}>
          <Fieldset title="Nom du cartel">
            <input
              ref={inputRef}
              name="cartel_name"
              id="cartel_name"
              value={loading ? 'creation en cours...' : name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </Fieldset>
        </form>
      }
      closeModalOnConfirm={false}
      onConfirm={handleClick}
      isConfirmDisabled={loading}
    >
      <Button onClick={() => setOpen(!open)}>Créer un cartel</Button>
    </ModalUi>
  )
}
