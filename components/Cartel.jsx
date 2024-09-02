'use client'

import { Item } from './Item'

export function Cartel({ cartel }) {
  return (
    <div className="flex flex-col gap-3">
      <Item item={cartel} type={cartel.type} />
      <div className="flex flex-col gap-2">
        <div className="italic text-mo-secondary">
          Cette partie modifie pour toutes les fiches utilisant cette entité
        </div>
        <Item item={cartel.refItem} type={cartel.refItem.type} />
      </div>
    </div>
  )
}
