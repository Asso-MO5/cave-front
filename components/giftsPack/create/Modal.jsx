'use client'
import { Button } from '@/ui/Button'
import { Modal as ModalUi } from '@/ui/Modal'
import { useState, useRef, useEffect } from 'react'
import { Fieldset } from '@/ui/Fieldset'
import { toast } from 'react-toastify'
import { operations } from '@/_api/operations'
import { fetcher } from '@/utils/fetcher'
import { useCheckRoles } from '@/hooks/useCheckRoles'

const { roles, path } = operations.postGifts_packs

const initialForm = {
  email: '',
  retailer: '',
  campain: 'Noël 2024',
  gift: 'TODO faire un select',
  numOfGifts: 5,
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
      if (initialData) {
        const res = await fetcher.put(
          `/gifts_packs/${initialData.id}`,
          ctrl.signal,
          form
        )

        if (!res.ok) throw new Error(resJson?.error || 'Erreur inconnue')
        onCreate(form)
      } else {
        const res = await fetcher.post(path, ctrl.signal, form)

        const resJson = await res.json()
        if (!res.ok) throw new Error(resJson?.error || 'Erreur inconnue')
        onCreate()
      }
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
          <Fieldset title="Nom du distributeur" required>
            <input
              ref={inputRef}
              value={form.retailer}
              onChange={(e) => handleChange('retailer', e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="Email du distributeur">
            <input
              ref={inputRef}
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="Campagne" required>
            <input
              placeholder="noel 2024 ..."
              ref={inputRef}
              value={form.campain}
              onChange={(e) => handleChange('retailer', e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="Campagne" required>
            <input
              ref={inputRef}
              value={form.numOfGifts}
              type="number"
              onChange={(e) => handleChange('numOfGifts', e.target.value)}
              disabled={loading}
            />
          </Fieldset>
          <Fieldset title="Lots" required>
            <select onChange={(e) => handleChange('gift', e.target.value)}>
              <option value="gsv">Entrée Game Story Versailles</option>
            </select>
          </Fieldset>
        </form>
      }
      onConfirm={handleClick}
      isConfirmDisabled={loading}
    >
      <Button onClick={() => setOpen(!open)}>
        {initialData ? 'modifier' : 'Ajouter une campagne'}
      </Button>
    </ModalUi>
  )
}
