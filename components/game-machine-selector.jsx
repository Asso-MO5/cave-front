'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import { ChevronDownIcon } from '@/ui/icon/chevron-down'
import { dc } from '@/utils/dynamic-classes'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { useEffect, useRef, useState } from 'react'
import { useItem } from './item'
import { Modal } from '@/ui/modal'

export function GameMachineSelector({ itemId }) {
  const { item, update } = useItem()
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const defaultMachine = item?.machine?.name || 'Aucune machine associée'

  const { data, refetch, loading } = useFetch({
    url: '/machines/' + item.id,

    params: {
      limit: 100000,
      light: true,
      name: debouncedQuery,
    },
  })

  const { refetch: mutation, data: dataMutation } = useFetch({
    url: '/companies',
    method: 'post',
    enabled: false,
  })

  const handleCreate = async () => {
    const form = new FormData()
    form.append('name', query)
    form.append('activities', type)
    await mutation(form)
    setQuery('')
    refetch()
  }

  const handleSelect = (machineId) => {
    update({ machineId })
  }

  useEffect(() => {
    if (data) {
      // TODO redirect
    }
  }, [data])

  useEffect(() => {
    if (dataMutation?.id) {
      // TODO redirect
    }
  }, [dataMutation])

  return (
    <Menu>
      <MenuButton
        className={dc(
          'rounded-sm px-2 py-1 text-sm/6 border border-primary font-bold uppercase',
          'flex items-center justify-between gap-2 '
        )}
      >
        {loading ? 'chargement ...' : defaultMachine}
        <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
      </MenuButton>
      <MenuItems
        anchor="bottom-right"
        className="mt-1 rounded-sm border border-mo-primary bg-mo-white"
      >
        {/*
        <MenuItem>
          <a className="block border-b border-primary p-2 " href="/settings">
            Créer une machine
          </a>
        </MenuItem>
        */}
        <div className="flex flex-col max-h-56 overflow-y-auto">
          {data?.map((machine) => (
            <MenuItem key={machine.id}>
              {machine.related_item_id === item.ref_id ? (
                <div
                  className="block data-[focus]:bg-mo-primary data-[focus]:text-mo-white cursor-pointer p-1"
                  href="/support"
                  onClick={() => handleSelect(machine.id)}
                >
                  {machine.name}
                </div>
              ) : (
                <Modal
                  title="Attention !"
                  content={
                    <div className="flex flex-col gap-2">
                      <div>
                        Tu va créer une nouvelle version du jeu pour la machine:
                      </div>
                      <div className="font-bold text-center">
                        {machine.name}
                      </div>
                    </div>
                  }
                  onConfirm={() => handleSelect(machine.id)}
                >
                  <div className="block hover:bg-mo-primary data-[focus]:text-mo-white cursor-pointer p-1 opacity-50">
                    {machine.name}
                  </div>
                </Modal>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
