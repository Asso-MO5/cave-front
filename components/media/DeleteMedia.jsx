'use client'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'

export function DeleteMedia({ close, onSubmit }) {
  const handleSubmit = () => {
    onSubmit?.()
    close?.()
  }

  return (
    <Modal
      cancelTxt={'Annuler'}
      confirmTxt={'Supprimer'}
      onConfirm={handleSubmit}
      content={
        <div className="flex flex-col space-y-4">
          <div>Êtes-vous sûr de vouloir supprimer cette image ?</div>
        </div>
      }
    >
      <div className="flex justify-center p-2">
        <Button theme="secondary">Supprimer le média</Button>
      </div>
    </Modal>
  )
}
