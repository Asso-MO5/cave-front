'use client'
import { Button } from '@/ui/Button'
import { Fieldset } from '@/ui/Fieldset'
import { fetcher } from '@/utils/fetcher'
import { useState } from 'react'
import { toast } from 'react-toastify'

export function FormUpdate({ gift, token }) {
  const [form, setForm] = useState(gift)
  const [loading, setLoading] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const ctrl = new AbortController()

    const haveChange = Object.keys(form).some((key) => form[key] !== gift[key])
    if (!haveChange) {
      toast.info('Aucun changement détecté')
      setLoading(false)
      return
    }

    try {
      const res = await fetcher.put(`/gift/${token}`, ctrl.signal, form)
      if (!res.ok) throw new Error(resJson?.error || 'Erreur inconnue')
      console.log(res)
      toast.success(
        'Le cadeau a bien été modifié, vous allez recevoir un email de confirmation'
      )
      setIsUpdated(true)
    } catch (e) {
      toast.error(`${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(gift)
  }

  if (gift.status === 'distributed')
    return (
      <div className="h-full w-full flex justify-center items-center">
        Le cadeau a déjà été utilisé
      </div>
    )

  if (isUpdated)
    return (
      <div className="h-full w-full flex flex-col gap-3 justify-center items-center">
        <div className="max-w-80">
          <p>
            Avant votre visite, vous devrez reserver votre créneaux sur le{' '}
            <a
              href="https://www.billetweb.fr/game-story"
              target="_blank"
              rel="noreferrer"
              className="text-mo-primary underline"
            >
              site de Game Story
            </a>
            , dans {`l'onglet "Visites libres"`}, choississez, {`"gratuit".`}
          </p>
          <div className="flex justify-center m-3 items-center flex-col gap-3">
            <img
              src="/gsc_step1.png"
              alt="Reservez votre place"
              width={300}
              className="h-auto"
            />
            <img
              src="/gsv_entree_gratuite.png"
              alt="Reservez votre place"
              width={300}
              className="h-auto"
            />
          </div>
        </div>
        <div>
          <Button onClick={() => setIsUpdated(false)}>Retour</Button>
        </div>
      </div>
    )
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-center">
          Pour bénéficier de votre pass,
          <br /> veuillez remplir ce formulaire
        </h2>
        <p className="text-xs text-center italic">
          Vous pouvez le modifier tant que le pass n'a pas été utilisé
        </p>

        <Fieldset title="Prénom" required>
          <input
            value={form.lastname}
            type="text"
            className="w-full"
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          />
        </Fieldset>
        <Fieldset title="Nom" required>
          <input
            value={form.name}
            type="text"
            className="w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Fieldset>
        <Fieldset title={'Email'} required>
          <input
            value={form.email}
            type="email"
            className="w-full"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Fieldset>
        {/** Juste année de naissance */}
        <Fieldset title="Année de naissance" required>
          <input
            value={form.birthdate}
            className="w-full"
            onChange={(e) =>
              setForm({
                ...form,
                birthdate: e.target.value,
              })
            }
          />
        </Fieldset>
        <Fieldset title="Code Postal" required>
          <input
            value={form.zipCode}
            type="text"
            className="w-full"
            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
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
