'use client'
import { HamburgerIconIcon } from '@/ui/icon/HamburgerIcon'
import { Avatar } from './Avatar'
import { dc } from '@/utils/dynamic-classes'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { useLocalState } from '@/hooks/useLocalState'
import { usePathname } from 'next/navigation'
import { decimalToHex } from '@/utils/decimalToHex'

const MENU = [
  {
    name: 'Outils',
    entries: [
      {
        name: 'Cartels',
        href: '/admin/cartels',
        regex: /admin\/cartel|admin\/cartels/,
      },
    ],
  },
]

export function Panel({ session }) {
  const pathname = usePathname()
  // ====== STATES ========================================
  const [{ open }, setOpen] = useLocalState('panel', {
    open: false,
  })

  // ====== HANDLERS ======================================
  const handleToogle = () =>
    setOpen({
      open: !open,
    })

  return (
    <nav
      className={dc('relative transition ease-in-out duration-100', [
        !open,
        'pr-5',
      ])}
    >
      <button
        className="fill-mo-primary absolute top-3 left-1 opacity-100 z-[900]"
        onClick={handleToogle}
      >
        <HamburgerIconIcon />
      </button>
      <Transition
        show={open}
        className={dc(
          'sm:relative fixed top-0 left-0 w-60 sm:w-auto h-full bg-mo-bg z-[800]',
          // Base styles
          'w-auto transition ease-in-out bg-mo-bg h-full pt-8 p-3 border-r-2 border-black/5',
          // Shared closed styles
          'data-[closed]:opacity-0',
          'data-[enter]:duration-100 data-[enter]:data-[closed]:-translate-x-full',
          // Leaving styles
          'data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-x-full'
        )}
      >
        <div className="flex justify-between flex-col h-full">
          <div>
            <div className="mb-2">
              <a
                href="/admin"
                className="text-mo-primary text-sm hover:text-mo-secondary"
              >
                Accueil
              </a>
            </div>
            {MENU.map((section, i) => (
              <div key={i} className="flex flex-col gap-1 mb-3">
                <h3 className="text-mo-text font-bold p-0">{section.name}</h3>
                <ul className="flex flex-col gap-1 pl-3">
                  {section.entries.map((entry) => (
                    <li key={entry.name}>
                      <a
                        href={entry.href}
                        className={dc(
                          'block text-sm hover:text-mo-secondary aria-current:text-mo-secondary pl-1 border-l-4',
                          [
                            entry.regex.test(pathname),
                            'border-mo-primary text-mo-primary',
                            ' border-transparent',
                          ]
                        )}
                        aria-current={
                          entry.regex.test(pathname) ? 'page' : null
                        }
                      >
                        {entry.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <img src="/logo_blue.webp" alt="logo" className="w-10 m-auto" />
            <Menu>
              <MenuButton>
                <Avatar
                  src={session.user.image}
                  alt="avatar"
                  size={24}
                  nickname={session.user.name}
                />
              </MenuButton>
              <MenuItems
                anchor="top"
                className="mx-2 -mb-4 bg-mo-white p-2 rounded border border-base flex flex-col gap-1"
              >
                {session.user.roles.map((role) => (
                  <MenuItem key={role.name}>
                    <div className={dc('text-xs flex gap-1 items-center')}>
                      <div
                        className={`rounded-full w-2 h-2`}
                        style={{ backgroundColor: decimalToHex(role.color) }}
                      />
                      {role.name}
                    </div>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </Transition>
    </nav>
  )
}
