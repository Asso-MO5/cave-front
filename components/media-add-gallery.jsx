'use client'
import { forwardRef, useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { VirtuosoGrid } from 'react-virtuoso'
import { dc } from '@/utils/dynamic-classes'
import { Button } from '@/ui/button'

function List({ children, ...props }) {
  return (
    <div {...props} className="flex flex-wrap">
      {children}
    </div>
  )
}

function Item({ children, ...props }) {
  return (
    <div {...props} className="flex justify-center p-1 w-1/4">
      {children}
    </div>
  )
}
const gridComponents = {
  List: forwardRef(List(props), ref),
  Item,
}

function ImageWrapper({ children, ...props }) {
  return (
    <div
      {...props}
      className="w-full relative overflow-hidden bg-mo-bg pt-[100%]"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}
export function MediaAddGallery({ onSubmit, multiple = false, close }) {
  const [selected, setSelected] = useState([])
  const { data, loading } = useFetch({
    url: '/medias/light',
  })

  const handleSelect = (index) => {
    if (multiple) {
      setSelected(
        selected?.includes(index)
          ? selected.filter((item) => item !== index)
          : [...selected, index]
      )
    } else {
      setSelected([index])
    }
  }

  const handleCancel = () => {
    setSelected([])
    close?.()
  }

  const handleConfirm = () => {
    onSubmit?.(data.filter((_, index) => selected.includes(index)))
  }

  if (!data || loading)
    return (
      <div className="w-80 flex justify-center items-end">Chargement...</div>
    )

  return (
    <div className="grid grid-rows-[20rem_auto] gap-2 p-2">
      <VirtuosoGrid
        style={{ height: '100%' }}
        totalCount={data.length}
        components={gridComponents}
        itemContent={(index) => (
          <ImageWrapper>
            <img
              onClick={() => handleSelect(index)}
              src={data[index].url}
              alt={data[index].alt}
              className={dc(
                'w-full border-4 h-full object-cover cursor-pointer transition-all',
                [
                  selected?.includes(index),
                  ' border-mo-primary',
                  'border-transparent',
                ]
              )}
            />
          </ImageWrapper>
        )}
      />
      <div className="flex gap-2 justify-end">
        <Button theme="secondary" onClick={handleCancel}>
          Annuler
        </Button>
        <Button type="submit" onClick={handleConfirm}>
          Valider
        </Button>
      </div>
    </div>
  )
}
