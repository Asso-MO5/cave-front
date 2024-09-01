import { PutItemsIdStatusStatusService } from '@/_api/PutItemsIdStatusStatusService.mjs'
import { useItem } from './Item'
import { ItemCompany } from './ItemCompany'
import { ItemCover } from './ItemCover'
import { ItemName } from './ItemName'
import { ItemReleaseYear } from './ItemReleaseYear'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { ItemStatus } from './ItemStatus'
import { ItemDescription } from './ItemDescription'
import { GameMachineSelector } from './GameMachineSelector'

const companies = {
  machine: ['manufacturer'],
  game: ['developer', 'publisher'],
  obj: ['manufacturer'],
}

export function ItemClassic() {
  const { item } = useItem()
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[4fr_1fr] w-full m-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
              {ITEM_TYPE_TITLE[item.type]}
            </div>
            <ItemName />
          </div>
          {item.type === 'game' && <GameMachineSelector />}
        </div>
        <ItemStatus rolesCanEdit={PutItemsIdStatusStatusService.roles} />
        <ItemDescription />
      </div>

      <div className="flex flex-col">
        <ItemCover />
        <ItemReleaseYear />
        {companies[item.type].map((company) => (
          <ItemCompany key={company} type={company} />
        ))}
      </div>
    </div>
  )
}
