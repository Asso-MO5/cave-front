'use client'
import { Button } from '@/ui/Button'
import { Modal as ModalUi } from '@/ui/Modal'
import { useState, useRef, useEffect } from 'react'
import { Fieldset } from '@/ui/Fieldset'
import { toast } from 'react-toastify'
import { operations } from '@/_api/operations'
import { fetcher } from '@/utils/fetcher'
import { useCheckRoles } from '@/hooks/useCheckRoles'

const { roles, path } = operations.postGifts_packs_direct

const initialForm = {
  email: '',
  retailer: '',
  campain: 'MO5 - Game Story',
  gift: 'TODO faire un select',
  numOfGifts: 1,
  type: 'gsv',
}

export function Modal({ onCreate, initialData }) {
  const inputRef = useRef(null) // Créer une référence pour l'input
  const timeRef = useRef(null) // Créer une référence pour le timeout
  const display = useCheckRoles(roles)

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialData || initialForm)

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleClick = async (e) => {
    e?.preventDefault()
    if (loading) return
    setLoading(true)

    const ctrl = new AbortController()

    try {
      const res = await fetcher.post(path, ctrl.signal, form)

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
      setForm(initialData || initialForm)
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
          <Fieldset title="Email du gagnant" required>
            <input
              ref={inputRef}
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="Nombre de pass" required>
            <select
              className="w-full"
              onChange={(e) =>
                handleChange('numOfGifts', parseInt(e.target.value))
              }
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </Fieldset>
        </form>
      }
      onConfirm={handleClick}
      isConfirmDisabled={loading}
    >
      <Button onClick={() => setOpen(!open)}>{'Envoyer un pass'}</Button>
    </ModalUi>
  )
}
