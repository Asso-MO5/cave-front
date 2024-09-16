import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'

const choices = [
  {
    name: 'Objet',
    value: 'obj',
  },
  {
    name: 'Jeu',
    value: 'game',
  },
  {
    name: 'Machine',
    value: 'machine',
  },
]

export function Selector({ defaultValue, onChange }) {
  const [choice, setChoice] = useState(
    choices.find((choice) => choice.value === defaultValue) || choices[0]
  )
  const handleSelect = (value) => {
    setChoice(choices.find((choice) => choice.value === value))
    onChange?.(value)
  }

  return (
    <Menu>
      <MenuButton className="rounded-sm px-2 py-1 text-sm/6 border border-primary font-bold uppercase flex items-center justify-between gap-2 ">
        {choice?.name}
        <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-1 rounded-sm border border-mo-primary bg-mo-white z-50 absolute"
      >
        <div className="flex flex-col  overflow-y-auto ">
          {choices.map((choice) => (
            <MenuItem key={choice.value}>
              <div
                className="block data-[focus]:bg-mo-primary data-[focus]:text-mo-white cursor-pointer p-1"
                onClick={() => handleSelect(choice.value)}
              >
                {choice.name}
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
