import { ChevronDownIcon } from '@/ui/icon/ChevronDownIcon'
import { ITEM_TYPE, ITEM_TYPE_TITLE } from '@/utils/constants'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'

const choices = [ITEM_TYPE.obj, ITEM_TYPE.game, ITEM_TYPE.machine]

/**
 * @description
 * ### Type Selector
 * Permet de choisir entre 3 types d'items (`Objet`, `Jeu`, `Machine`)
 *
 * @param {Object} props
 * @param {string} props.defaultValue
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
export function Selector({ defaultValue, onChange }) {
  const [choice, setChoice] = useState(
    choices.find((choice) => choice === defaultValue) || choices[0]
  )
  const handleSelect = (value) => {
    setChoice(choices.find((choice) => choice === value))
    onChange?.(value)
  }

  return (
    <Menu>
      <MenuButton className="rounded-sm px-2 py-1 text-sm/6 font-bold uppercase flex items-center justify-between gap-2 bg-mo-white">
        {ITEM_TYPE_TITLE[choice]}
        <ChevronDownIcon className="w-4 h-4 ml-1 fill-mo-primary" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-1 rounded-sm border border-mo-primary bg-mo-white z-50 absolute"
      >
        <div className="flex flex-col  overflow-y-auto ">
          {choices.map((c) => (
            <MenuItem key={c}>
              <div
                className="block data-[focus]:bg-mo-primary data-[focus]:text-mo-white cursor-pointer p-1"
                onClick={() => handleSelect(c)}
              >
                {ITEM_TYPE_TITLE[c]}
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
