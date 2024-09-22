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
import { useDebounce } from '@/hooks/useDebounce'

const { roles, path } = operations.postItems
const { postItemsExist } = operations

export function Modal() {
  const inputRef = useRef(null) // Créer une référence pour l'input
  const timeRef = useRef(null) // Créer une référence pour le timeout
  const display = useCheckRoles(roles)
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [isAlreadyExist, setIsAlreadyExist] = useState(false)
  const debouncedName = useDebounce(name, 500)

  const [open, setOpen] = useState(false)

  const handleClick = async (e) => {
    e?.preventDefault()
    if (loading || isAlreadyExist) return
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

  const checkName = async () => {
    const ctrl = new AbortController()

    try {
      const res = await fetcher.post(postItemsExist.path, ctrl.signal, {
        name: debouncedName,
        type: 'cartel',
      })

      const { exist } = await res.json()
      setIsAlreadyExist(exist)
    } catch (e) {
      console.error(e)
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
      setName('')
      setIsAlreadyExist(false)
    }
    return () => timeRef.current && clearTimeout(timeRef.current)
  }, [open])

  useEffect(() => {
    if (debouncedName) checkName()
  }, [debouncedName])

  if (!display) return null

  return (
    <ModalUi
      onCancel={() => setOpen(false)}
      disabled={isAlreadyExist || loading}
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
            <div
              data-is-already-exist={isAlreadyExist}
              className="text-mo-error text-center text-sm italic transition-colors data-[is-already-exist='true']:opacity-100 data-[is-already-exist='false']:opacity-0"
            >
              Ce cartel existe déjà !
            </div>
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
