import { PutItemsIdStatusStatusService } from '@/_api/PutItemsIdStatusStatusService.mjs'
import { useItem } from './Item'
import { ItemStatus } from './ItemStatus'
import { StrReadEdit } from './StrReadEdit'
import { TextReadEdit } from './TextReadEdit'

export function ItemCartel() {
  const { update, item } = useItem()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
            Cartel
          </div>
          <StrReadEdit
            update={(value) => update({ name: value })}
            defaultValue={item.name}
          />
        </div>
      </div>
      <ItemStatus rolesCanEdit={PutItemsIdStatusStatusService.roles} />
      <TextReadEdit
        defaultValue={item?.description}
        update={(description) => update({ description })}
      />

      <p>TODO: Ajouter les champs personalisés</p>
      <hr className="col-span-3" />
    </div>
  )
}
