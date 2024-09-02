import { PutItemsIdStatusStatusService } from '@/_api/PutItemsIdStatusStatusService.mjs'
import { useItem } from './Item'
import { ItemName } from './ItemName'
import { ItemStatus } from './ItemStatus'
import { ItemDescription } from './ItemDescription'

export function ItemCartel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
            Cartel
          </div>
          <ItemName />
        </div>
      </div>
      <ItemStatus rolesCanEdit={PutItemsIdStatusStatusService.roles} />
      <ItemDescription />
      <p>TODO: Ajouter les champs personalisés</p>
      <hr className="col-span-3" />
    </div>
  )
}
