'use client'
import { forwardRef, useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { Button } from '@/ui/Button'
import { operations } from '@/_api/operations'
import { fetcher } from '@/utils/fetcher'

const { getMediasLight } = operations

function Item({ children, ...props }) {
  return (
    <div {...props} className="flex justify-center p-1 w-1/4">
      {children}
    </div>
  )
}

const gridComponents = {
  List: forwardRef(function List({ children, ...props }, ref) {
    return (
      <div ref={ref} {...props} className="flex flex-wrap">
        {children}
      </div>
    )
  }),
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
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const handleFetch = async () => {
    setLoading(true)
    const ctrl = new AbortController()
    const res = await fetcher[getMediasLight.method](
      getMediasLight.path,
      ctrl.signal
    )

    const resData = await res.json()
    setData(resData)
    setLoading(false)
  }

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

  useEffect(() => {
    handleFetch()
  }, [])

  if (!data || loading)
    return (
      <div className="w-80 flex justify-center items-end">Chargement...</div>
    )

  if (data.length === 0)
    return (
      <div className="p-3 flex justify-center items-end italic text-mo-error">
        Aucune image
      </div>
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
              data-selected={selected?.includes(index)}
              className="w-full border-4 h-full object-cover cursor-pointer transition-all border-transparent data-[selected=true]:border-mo-primary"
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
