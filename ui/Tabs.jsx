'use client'
import { dc } from '@/utils/dynamic-classes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export function Tabs({ tabs, disabledquery = false }) {
  const search = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const tab = search.get('tab')
  const [currentTab, setCurrentTab] = useState(0)
  const activeTab = useMemo(() => {
    if (disabledquery) return currentTab
    if (!tab) return 0
    const idx = tabs.findIndex((t) => t.key === tab)
    if (idx === -1) return 0
    return idx
  }, [tab, currentTab])

  const handleChangeTab = (index) => {
    setCurrentTab(index)
    if (disabledquery) return
    const params = new URLSearchParams(search.toString())
    params.set('tab', tabs[index].key)
    router.push(pathname + '?' + params.toString())
  }

  return (
    <>
      <nav className="w-full flex">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => handleChangeTab(index)}
            className={dc('border-b-2 px-2 py-1 font-secondary', [
              index === activeTab,
              'border-mo-primary',
              'border-black/10',
            ])}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {tabs[activeTab].content}
    </>
  )
}
