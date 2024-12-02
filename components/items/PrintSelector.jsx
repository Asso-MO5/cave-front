import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { fetcher } from '@/utils/fetcher'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import { PRINT_TYPES } from '../cartel/cartel.utils'

export function PrintSelector({ selectedIds, selectedTotal }) {
  const [loading, setLoading] = useState(false)

  const getType = (name) => {
    if (name === 'csv') return 'csv'
    if (name === 'emplacement') return 'place'
    return 'print'
  }
  const getExtension = (name) => {
    if (name === 'csv') return 'csv'
    return 'zip'
  }

  const handleDl = async (format) => {
    if (loading || selectedIds.length === 0) return
    setLoading(true)
    const ctrl = new AbortController()

    const type = getType(format)
    try {
      const response = await fetcher.post(`/items/export`, ctrl.signal, {
        exportType: type,
        format,
        type: 'cartel',
        ids: selectedIds,
        selectedTotal,
      })
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `items-${format}-${
        selectedTotal ? 'all' : selectedIds.length
      }.${getExtension(format)}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Menu>
      <MenuButton className="rounded-md p-1 text-sm text-mo-primary border border-mo-primary flex items-center justify-between gap-2 bg-mo-white">
        {loading ? '...' : `Exporter`}
        <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-1 rounded-sm border border-mo-primary bg-mo-white z-50 absolute"
      >
        <div className="flex flex-col">
          {[
            {
              name: 'csv',
            },
            {
              name: 'emplacement',
            },
            ...PRINT_TYPES,
          ].map((c) => (
            <MenuItem key={c.name}>
              <div
                className="uppercase block data-[focus]:bg-mo-primary  data-[focus]:text-mo-white cursor-pointer px-2 py-1 hover:bg-mo-primary hover:text-mo-white data-[disabled=true]:opacity-50"
                onClick={() => handleDl(c.name)}
                data-disabled={
                  selectedIds.length === 0 && c.name !== 'emplacement'
                }
              >
                {c.name} {c.name === 'emplacement'}
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
