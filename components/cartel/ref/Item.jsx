'use client'

import { Selector as ItemSelector } from '@/components/item/Selector'
import { Selector as TypeSelector } from '@/components/item/type/Selector'
import { Fieldset } from '@/ui/Fieldset'
import { ACTIVITIES_COMPANY } from '@/utils/constants'
import { useCrud } from '@/components/crud/useCrud'
import { COMPANIES_PER_TYPE } from '../cartel.utils'

/**
 *
 * @returns
 */
export function Item() {
  const {
    get: { data: item },
    update: { action: update },
  } = useCrud('item_ref')

  const companies = COMPANIES_PER_TYPE?.[item.type] || []
  console.log('companies', item)
  return (
    <div className="flex flex-col gap-2">
      <TypeSelector
        defaultValue={item.type}
        onChange={(type) => update({ type })}
      />

      {companies.map((companyType) => (
        <Fieldset
          key={`${companyType}-${item.type}`}
          title={ACTIVITIES_COMPANY[companyType]}
        >
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
