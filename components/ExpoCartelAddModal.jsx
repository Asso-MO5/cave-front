import { GetItemsService } from '@/_api/GetItemsService.mjs'
import { PostExposExpoidCartelsService } from '@/_api/PostExposExpoidCartelsService.mjs'
import { useApi } from '@/hooks/useApi'
import { useDebounce } from '@/hooks/useDebounce'
import { useEmit } from '@/hooks/useEmit'
import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { Modal } from '@/ui/Modal'
import { dc } from '@/utils/dynamic-classes'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useItem } from './Item'

const types = [
  {
    label: 'Jeu',
    value: 'game',
  },
  {
    label: 'Machine',
    value: 'machine',
  },
  {
    label: 'Objet',
    value: 'obj',
  },
]

export function ExpoCartelAddModal() {
  const { item } = useItem()
  const toastId = useRef()

  const { emit } = useEmit('refetch-expos')
  const { data, refetch } = useApi(GetItemsService, {
    autoFetch: false,
  })

  const { mutate: createCartel, loading: loadingCreate } = useApi(
    PostExposExpoidCartelsService,
    {
      params: {
        expoId: item.id,
      },
      autoFetch: false,
    }
  )

  const [search, setSearch] = useState('')
  const [type, setType] = useState(types[0])

  const debouncedSearch = useDebounce(search, 500)

  const handleSelectType = (type) => {
    setType(type)
  }

  const handleSelectItem = (item) => {
    handleCreate({ slug: item.slug })
  }

  const handleConfirm = () => {
    handleCreate({ name: search, type: type.value })
  }

  const handleCreate = async (payload) => {
    toastId.current = toast.loading('Création en cours 🚀', {
      id: 'create-cartel',
    })
    try {
      await createCartel({
        body: payload,
      })
      toast.update(toastId.current, {
        render: 'Création réussie 🎉',
        isLoading: false,
        type: 'success',
        autoClose: 5000,
        closeButton: true,
      })
      emit()
      setSearch('')
    } catch (error) {
      toast.update(toastId.current, {
        render: typeof err === 'string' ? err : err.message,
        isLoading: false,
        type: 'error',
        autoClose: 5000,
        closeButton: true,
      })
    } finally {
      toastId.current = null
      return true
    }
  }

  useEffect(() => {
    if (debouncedSearch) {
      refetch({
        query: {
          search: debouncedSearch,
          type: type.value,
        },
      })
    }
  }, [debouncedSearch, type])

  return (
    <Modal
      title="Ajouter un cartel"
      isConfirmDisabled={!search || loadingCreate}
      closeModalOnConfirm
      onCancel={() => setSearch('')}
      onConfirm={handleConfirm}
      content={
        <div className="grid grid-rows-[auto_auto_1fr] gap-3 min-w-36">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Menu>
            <MenuButton
              className={dc(
                'rounded-sm px-2 py-1 text-sm/6 border border-primary font-bold uppercase',
                'flex items-center justify-between gap-2'
              )}
            >
              {type.label}
              <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
            </MenuButton>
            <MenuItems
              anchor="bottom-right"
              className="mt-1 rounded-sm border border-mo-primary bg-mo-white w-48 p-2 font-bold"
            >
              {types
                .filter((c) => c.value !== type.value)
                .map((choice) => (
                  <MenuItem key={choice.value}>
                    <div
                      className="block data-[focus]:bg-mo-primary data-[focus]:text-mo-white cursor-pointer p-1 w-full"
                      onClick={() => handleSelectType(choice)}
                    >
                      {choice.label}
                    </div>
                  </MenuItem>
                ))}
            </MenuItems>
          </Menu>

          <div className="h-full relative min-h-40">
            <div className="absolute inset-0 flex flex-col gap-2 overflow-y-auto text-mo-primary ">
              {data?.map((item) => (
                <div
                  key={item.slug}
                  className="first-letter:uppercase cursor-pointer hover:text-mo-secondary"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="btn">Ajouter un cartel</div>
    </Modal>
  )
}
