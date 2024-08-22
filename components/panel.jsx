'use client'
import { HamburgerIcon } from '@/ui/icon/hamburger'
import { Avatar } from './avatar'
import { dc } from '@/utils/dynamic-classes'
import { Transition } from '@headlessui/react'
import { useLocalState } from '@/hooks/useLocalState'
import { usePathname } from 'next/navigation'

const MENU = [
  {
    name: 'Fiches expos',
    entries: [
      { name: 'Machines', href: '/admin/machines', regex: /machine|machines/ },
      { name: 'Jeux', href: '/admin/games', regex: /game|games/ },
      /* {
        name: 'Compagnies',
        href: '/admin/companies',
        regex: /company|companies/,
      }, */
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
        <HamburgerIcon />
      </button>
      <Transition
        show={open}
        className={dc(
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
              <div key={i} className="flex flex-col gap-1">
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
            <Avatar
              src={session.user.image}
              alt="avatar"
              size={24}
              nickname={session.user.name}
            />
          </div>
        </div>
      </Transition>
    </nav>
  )
}
