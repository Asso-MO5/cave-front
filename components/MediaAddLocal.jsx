import { Button } from '@/ui/Button'
import { TrashIcon } from '@/ui/icon/TrashIcon'
import { Modal } from '@/ui/Modal'
import { dc } from '@/utils/dynamic-classes'
import { useState } from 'react'

export function MediaAddLocal({
  defaultImg = {
    src: '',
    alt: '',
  },
  close,
  update,
}) {
  const [previewCover, setPreviewCover] = useState(defaultImg)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleAddCover(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleAddCover = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      update(file, { src: reader.result, alt: file.name })
      close()
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteCover = () => {
    update({ cover_id: '' })
    setPreviewCover({
      src: null,
      alt: null,
    })
  }

  return (
    <div className="flex flex-col gap-3 m-4">
      <div
        className={dc(
          'border border-dashed border-mo-primary p-2 min-h-14 cursor-pointer justify-center  flex items-center text-center transition-all',
          [isDragOver, 'border-mo-valid']
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <label htmlFor="cover_image" className="cursor-pointer">
          {previewCover?.src ? "Modifier l'image" : 'Ajouter une image'}
        </label>
        <input
          type="file"
          id="cover_image"
          name="cover_image"
          className="hidden"
          onChange={(e) => handleAddCover(e.target.files[0])}
        />
      </div>
      {previewCover?.src && (
        <div className="flex justify-center relative items-center  m-auto">
          <img
            src={previewCover.src}
            alt={previewCover.alt}
            className="h-56 w-auto"
          />
          <Modal
            onConfirm={handleDeleteCover}
            content={
              <div className="flex flex-col gap-3">
                <div className="text-center">
                  Voulez-vous vraiment supprimer cette image ?
                </div>
                <img
                  src={previewCover.src}
                  alt={previewCover.alt}
                  className="max-h-28 w-auto m-auto"
                />
              </div>
            }
          >
            <button className="absolute -top-1 -right-1 fill-white bg-mo-error w-6 h-6 rounded-full items-center justify-center flex transition-transform hover:scale-110">
              <TrashIcon className="h-4" />
            </button>
          </Modal>
        </div>
      )}
      <div className="flex justify-end">
        <Button theme="secondary" onClick={close}>
          Annuler
        </Button>
      </div>
    </div>
  )
}
