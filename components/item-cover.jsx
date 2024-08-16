'use client'
import { useEmit } from '@/hooks/useEmit'
import { ReadAndEdit } from '@/ui/read-and-edit'
import { useItem } from './item'
import { useState } from 'react'
import { dc } from '@/utils/dynamic-classes'
import { Button } from '@/ui/button'
import { TrashIcon } from '@/ui/icon/trash'
import { Modal } from '@/ui/Modal'

export function ItemCover() {
  const { item, update } = useItem()
  const { emit } = useEmit()

  const [previewCover, setPreviewCover] = useState(
    item.cover_url
      ? {
          src: item.cover_url,
          alt: item.name,
        }
      : undefined
  )
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

  const handleAddCover = (file, handleToggle) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewCover({
        src: reader.result,
        alt: file.name,
      })
      handleToggle()
      update({
        cover: file,
      })
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
    <ReadAndEdit
      read={() => (
        <div className="item-cover">
          {previewCover?.src ? (
            <img
              src={previewCover.src}
              alt={previewCover.alt}
              className="w-auto h-28"
            />
          ) : (
            <div className="italic">aucune image définie</div>
          )}
        </div>
      )}
      edit={(handleToggle) => (
        <div className="flex flex-col gap-3">
          <div
            className={dc(
              'border border-dashed border-mo-primary p-2 cursor-pointer text-center transition-all',
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
              onChange={(e) => handleAddCover(e.target.files[0], handleToggle)}
            />
          </div>
          {previewCover?.src && (
            <div className="flex justify-center relative items-center h-28 m-auto">
              <img
                src={previewCover.src}
                alt={previewCover.alt}
                className="h-28 w-auto"
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
            <Button theme="secondary" onClick={handleToggle}>
              Annuler
            </Button>
          </div>
        </div>
      )}
    />
  )
}
