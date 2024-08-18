import { dc } from '@/utils/dynamic-classes'
import { useState } from 'react'

export function Tabs({ tabs, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || 0)

  return (
    <>
      <nav className="w-full flex">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(index)}
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
