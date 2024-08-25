'use client'

import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import { Fieldset } from './Fieldset'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { fetcher } from '@/utils/fetcher'
import { useRouter } from 'next/navigation'
import { useCheckRoles } from '@/hooks/useCheckRoles'
import { PostItemsService } from '@/api/PostItemsService'
import { useSession } from './SessionProvider'
import { ItemCreateBody } from '@/api/ItemCreateBody'

const postItemsService = new PostItemsService()

export function ItemAddForm({ title, type }) {
  const { apiContext } = useSession()
  const canCreate = useCheckRoles(postItemsService.roles)

  // ===== HOOKS ================================================
  const router = useRouter()
  // ===== REFS ================================================
  const ref = useRef()
  const signal = useRef()
  const toastId = useRef()
  // ===== STATES ==============================================
  const [loading, setLoading] = useState(false)

  // ===== HANDLERS ==========================================
  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!ref.current) return

    // ----- LOADING STATE -----------------------------------
    setLoading(true)
    toastId.current = toast.loading('Envoi de la requête en cours 🚀', {
      id: 'item-form',
    })

    const controller = new AbortController()
    signal.current = controller.signal
    // ----- FORM DATA ---------------------------------------
    const form = new FormData(ref.current)

    if (!form.get('name')) return toast.warning('Nom obligatoire')

    //DATA Control
    const body = new ItemCreateBody({
      name: form.get('name'),
      type,
    })

    // ----- API CALL ----------------------------------------
    try {
      const newItem = await postItemsService.execute({
        body: {
          type: body.type,
          name: body.name,
        },
        context: apiContext,
      })

      if (newItem.slug > 201) {
        toast.update(toastId.current, {
          render: newItem.error || 'Erreur lors de la création',
          isLoading: false,
          type: 'error',
          autoClose: 5000,
          closeButton: true,
        })
        return
      }
      toast.update(toastId.current, {
        render: 'Création réussie 🎉',
        isLoading: false,
        type: 'success',
        autoClose: 5000,
        closeButton: true,
      })
      return router.push(`/admin/${type}/${newItem.slug}`)
    } catch (err) {
      toast.update(toastId.current, {
        render: typeof err === 'string' ? err : err.message,
        isLoading: false,
        type: 'error',
        autoClose: 5000,
        closeButton: true,
      })
    } finally {
      setLoading(false)
    }
  }

  // ===== RENDER ============================================
  if (!canCreate) return null
  return (
    <Modal
      title={title}
      confirmBtnType="submit"
      closeModalOnConfirm={false}
      onConfirm={handleSubmit}
      content={
        <form onSubmit={handleSubmit} ref={ref}>
          <Fieldset title="Nom" required>
            <input
              id="name"
              type="text"
              name="name"
              disabled={loading}
              autoFocus={true}
            />
          </Fieldset>
        </form>
      }
    >
      <Button theme="primary" disabled={loading}>
        {loading ? '...' : title}
      </Button>
    </Modal>
  )
}
