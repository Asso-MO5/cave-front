import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { fetcher } from '@/utils/fetcher'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import { PRINT_TYPES } from '../cartel/cartel.utils'

export function PrintSelector({ selectedIds, selectedTotal }) {
  const [loading, setLoading] = useState(false)

  const handleDl = async (format) => {
    if (loading || selectedIds.length === 0) return
    setLoading(true)
    const ctrl = new AbortController()
    try {
      const response = await fetcher.post(`/items/export`, ctrl.signal, {
        exportType: 'print',
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
      }.zip`
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
      <MenuButton
        className="rounded-md p-1 text-sm text-mo-primary border border-mo-primary flex items-center justify-between gap-2 bg-mo-white"
        disabled={selectedIds.length === 0}
      >
        {loading ? '...' : `Exporter (print)`}
        <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-1 rounded-sm border border-mo-primary bg-mo-white z-50 absolute"
      >
        <div className="flex flex-col">
          {PRINT_TYPES.map((c) => (
            <MenuItem key={c.name}>
              <div
                className="uppercase block data-[focus]:bg-mo-primary  data-[focus]:text-mo-white cursor-pointer px-2 py-1 hover:bg-mo-primary hover:text-mo-white"
                onClick={() => handleDl(c.name)}
              >
                {c.name}
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
