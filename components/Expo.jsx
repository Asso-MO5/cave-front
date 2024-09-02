import { useItem } from './Item'
import { ItemName } from './ItemName'
import { ITEM_TYPE_TITLE } from '@/utils/constants'
import { ItemDescription } from './ItemDescription'
import { ExpoCartelsTable } from './ExpoCartelsTable'
import { Tabs } from '@/ui/Tabs'
import { ExpoCartelAddModal } from './ExpoCartelAddModal'

export function Expo() {
  const { item } = useItem()
  return (
    <div className="grid grid-rows-[auto_1fr] w-full h-full">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
              {ITEM_TYPE_TITLE[item.type]}
            </div>
            <ItemName />
          </div>
          <div>
            <ExpoCartelAddModal />
          </div>
        </div>
        <ItemDescription />
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-2 h-full">
        <Tabs
          tabs={[
            {
              key: 'cartels',
              label: 'Cartels',
              content: <ExpoCartelsTable />,
            },
          ]}
        />
      </div>
    </div>
  )
}
