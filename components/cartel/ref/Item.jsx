'use client'

import { useCrud } from '@/components/crud/useCrud'
import { Selector as ItemSelector } from '@/components/item/Selector'
import { Selector as TypeSelector } from '@/components/item/type/Selector'
import { Fieldset } from '@/ui/Fieldset'
import { ACTIVITIES_COMPANY } from '@/utils/constants'

const companiesPerType = {
  obj: ['manufacturer'],
  game: ['publisher', 'developer'],
  machine: ['manufacturer'],
}

/**
 *
 * @returns
 */
export function Item() {
  const {
    get: { data: item },
    update: { action: update },
  } = useCrud('ref_item')

  return (
    <div className="flex flex-col gap-2">
      <TypeSelector
        defaultValue={item.type}
        onChange={(type) => update({ type })}
      />

      {companiesPerType[item.type].map((companyType) => (
        <Fieldset key={companyType} title={ACTIVITIES_COMPANY[companyType]}>
          <ItemSelector
            type={companyType}
            defaultValue={item?.relations?.find(
              (it) => it.type === companyType
            )}
            onSelect={(id) => update({ company: { type: companyType, id } })}
          />
        </Fieldset>
      ))}
    </div>
  )
}
