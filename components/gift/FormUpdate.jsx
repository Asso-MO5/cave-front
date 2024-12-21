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
      toast.success(
        `Le pass a bien été ${
          gift?.id ? 'modifié' : 'créé'
        }, vous allez recevoir un email de confirmation`
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
        Le pass a déjà été utilisé
      </div>
    )

  if (isUpdated)
    return (
      <div className="h-full w-full flex flex-col gap-3 justify-center items-center text-center">
        <div className="max-w-80">
          <p>
            Réservez votre créneau sur{' : '}
            <span className="block">
              <a
                href="https://www.billetweb.fr/game-story"
                target="_blank"
                rel="noreferrer"
                className="text-mo-primary underline"
              >
                Billeterie Game Story
              </a>
            </span>
          </p>
          <div className="flex justify-center m-3 items-center flex-col gap-3">
            <div>Sélectionnez votre date de venue et un créneau horaire.</div>
            <div className="italic text-mo-valid">Exemple étape 1:</div>
            <img
              src="/gsc_step1.png"
              alt="Réservez votre place"
              width={300}
              className="h-auto"
            />
            <div>
              Puis dans {`l'onglet`}{' '}
              <span className="font-bold">{`"Visites libres"`}</span>,
              choisissez,<span className="font-bold"> {`"gratuit".`}</span>
            </div>
            <div className="italic text-mo-valid">Exemple étape 2:</div>
            <img
              src="/gsv_entree_gratuite.png"
              alt="Réservez votre place"
              width={300}
              className="h-auto"
            />
          </div>
          <div>
            Bonne visite et à bientôt au musée du jeu vidéo Game Story !
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
            onChange={(e) => {
              if (e.target.value.match(/[^0-9]/g)) return
              if (e.target.value.length > 4) return
              setForm({
                ...form,
                birthdate: e.target.value,
              })
            }}
          />
        </Fieldset>
        <Fieldset title="Code Postal" required>
          <input
            value={form.zipCode}
            type="text"
            className="w-full"
            onChange={(e) => {
              //on limite à 5 chiffres
              if (e.target.value.match(/[^0-9]/g)) return
              if (e.target.value.length > 5) return
              setForm({ ...form, zipCode: e.target.value })
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
