import { PutItemsIdStatusStatusService } from '@/_api/PutItemsIdStatusStatusService.mjs'
import { useItem } from './Item'
import { ItemCompany } from './ItemCompany'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { ItemStatus } from './ItemStatus'
import { GameMachineSelector } from './GameMachineSelector'
import { StrReadEdit } from './StrReadEdit'
import { TextReadEdit } from './TextreadEdit'
import { MediaReadEdit } from './MediaReadEdit'
import { YearReadEdit } from './YearReadEdit'

const companies = {
  machine: ['manufacturer'],
  game: ['developer', 'publisher'],
  obj: ['manufacturer'],
}

export function ItemClassic() {
  const { item, update } = useItem()
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[4fr_1fr] w-full m-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
              {ITEM_TYPE_TITLE[item.type]}
            </div>
            <StrReadEdit
              update={(value) => update({ name: value })}
              defaultValue={item.name}
            />
          </div>
          {item.type === 'game' && <GameMachineSelector />}
        </div>
        <ItemStatus rolesCanEdit={PutItemsIdStatusStatusService.roles} />
        <TextReadEdit
          defaultValue={item?.description}
          update={(description) => update({ description })}
        />
      </div>

      <div className="flex flex-col">
        <MediaReadEdit
          name={item.name}
          url={item.cover_url}
          update={(partial) => {
            const keys = Object.keys(partial)
            if (keys.includes('id')) update({ cover_id: partial.id })
            if (keys.includes('file')) update({ cover: partial.file })
            if (keys.includes('url')) update({ cover_url: partial.url })
          }}
        />
        <YearReadEdit
          defaultValue={item.release_year}
          label="Année de sortie"
          update={(release_year) => update({ release_year })}
        />
        {companies[item.type].map((company) => (
          <ItemCompany key={company} type={company} />
        ))}
      </div>
    </div>
  )
}
