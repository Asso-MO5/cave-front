'use client'

import { useCrud } from '@/components/crud/useCrud'
import { Selector } from '@/components/item/type/Selector'

export function Item() {
  const {
    get: { data: item },
    update: { action: update },
  } = useCrud('ref_item')

  return (
    <div className="flex flex-col gap-2">
      <Selector
        defaultValue={item.type}
        onChange={(value) => console.log({ value })}
      />
    </div>
  )
}
