'use client'
import { Button } from '@/ui/Button'
import { Modal as ModalUi } from '@/ui/Modal'
import { useState } from 'react'
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

  if (!display) return null

  return (
    <ModalUi
      content={
        <form onSubmit={handleClick}>
          <Fieldset title="Nom du cartel">
            <input
              name="name"
              id="name"
              autoFocus
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
      <Button>Créer un cartel</Button>
    </ModalUi>
  )
}
