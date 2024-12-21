'use client'
import { Button } from '@/ui/Button'
import { Fieldset } from '@/ui/Fieldset'
import { StatusChip } from '@/ui/StatusChip'
import { fetcher } from '@/utils/fetcher'
import { useState } from 'react'
import { toast } from 'react-toastify'

const initialData = {
  email: '',
  name: '',
  birthdate: '',
}

const STATUS = {
  draft: {
    color: 'text-mo-primary',
    text: 'Brouillon',
  },
  distributed: {
    color: 'text-mo-valid',
    text: 'Distribué',
  },
  notDistributed: {
    color: 'text-mo-warning',
    text: 'Non distribué',
  },
  validated: {
    color: 'text-mo-valid',
    text: 'Validé',
  },
  refused: {
    color: 'text-mo-error',
    text: 'Refusé',
  },
  already_distributed: {
    color: 'text-mo-error',
    text: 'Déjà distribué',
  },
}
export function Check() {
  const [form, setForm] = useState(initialData)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const ctrl = new AbortController()

    try {
      const res = await fetcher.post(`/gift/check`, ctrl.signal, form)
      const resJson = await res.json()
      if (!res.ok) throw new Error(resJson?.error || 'Erreur inconnue')

      setResult(resJson)
    } catch (e) {
      toast.error(`${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(initialData)
    setResult(null)
  }

  if (result) {
    return (
      <div className="h-full w-full flex justify-center items-center flex-col gap-4">
        <div className="flex items-center gap-4">
          <StatusChip status={result.status} />
          {result.status === 'refused' ? (
            <div className={STATUS[result.status]?.color}>{result.message}</div>
          ) : (
            <div className={`${STATUS[result.status]?.color} font-bold`}>
              Le {new Date(result.updated_at).toLocaleDateString()} à{' '}
              {new Date(result.updated_at).toLocaleTimeString()}
            </div>
          )}
        </div>
        {result.email && (
          <div className="flex flex-col gap-4">
            <span>Email: {result.email}</span>
            <span>Nom: {result.name}</span>
            <span>Prénom: {result.lastname}</span>
            <span>Date de naisance: {result.birthdate}</span>
            <span>Code postal: {result.zipCode}</span>
          </div>
        )}
        <Button onClick={handleReset}>Retour</Button>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-center">Vérification des entrées</h2>

        <Fieldset title="Nom" required>
          <input
            value={form.name}
            type="text"
            className="w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Fieldset>
        <Fieldset title="Prénom" required>
          <input
            value={form.lastname}
            type="text"
            className="w-full"
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          />
        </Fieldset>

        <Fieldset title="Code Postal" required>
          <input
            value={form.zipCode}
            className="w-full"
            onChange={(e) => {
              if (e.target.value.match(/[^0-9]/g)) return
              if (e.target.value.length > 5) return
              setForm({
                ...form,
                zipCode: e.target.value,
              })
            }}
          />
        </Fieldset>

        <div className="flex justify-between gap-4">
          <Button type="reset" theme="secondary" onClick={handleReset}>
            annuler
          </Button>
          <Button type="submit" theme="primary" disabled={loading}>
            {loading ? 'En cours...' : 'Valider'}
          </Button>
        </div>
      </form>
    </div>
  )
}
