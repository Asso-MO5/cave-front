'use client'
import { ReadAndEdit } from '@/ui/read-and-edit'
import { useItem } from './item'
import { ACTIVITIES_COMPANY } from '@/utils/constants'
import { Fieldset } from './fieldset'
import { CompanySelector } from './company-selector'
import { useState } from 'react'
import { Button } from '@/ui/button'

export function ItemCompany({ type = 'manufacturer' }) {
  const { item, update } = useItem()
  const company = item[type]
  const [current, setCurrent] = useState({
    id: company?.id,
    name: company?.name,
  })

  const handleSelect = (c) => {
    update({
      company: {
        id: current.id,
        oldId: c.id,
      },
    })
    setCurrent(c)
  }

  return (
    <ReadAndEdit
      read={(close) =>
        !company?.id ? (
          <div>--</div>
        ) : (
          <Fieldset title={ACTIVITIES_COMPANY[current.relation_type]}>
            <div className="uppercase font-bold">{current?.name}</div>
          </Fieldset>
        )
      }
      edit={(close) => (
        <Fieldset title={ACTIVITIES_COMPANY[company.relation_type]}>
          <div className="flex flex-col gap-2">
            <CompanySelector
              type={type}
              onSelect={handleSelect}
              defaultValue={current}
            />
            <div className="flex justify-end">
              <Button onClick={close}>Fermer</Button>
            </div>
          </div>
        </Fieldset>
      )}
    />
  )
}
