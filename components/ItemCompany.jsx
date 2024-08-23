'use client'
import { ReadAndEdit } from '@/ui/ReadAndEdit'
import { useItem } from './Item'
import { ACTIVITIES_COMPANY } from '@/utils/constants'
import { Fieldset } from './Fieldset'
import { CompanySelector } from './CompanySelector'
import { useState } from 'react'
import { Button } from '@/ui/Button'

export function ItemCompany({ type = 'manufacturer' }) {
  const { item, update } = useItem()
  const company = item[type]
  const [current, setCurrent] = useState({
    id: company?.id,
    name: company?.name,
  })

  const handleSelect = (c) => {
    if (!c) return
    update({
      company: {
        id: current.id,
        oldId: c.id,
        relation_type: type,
      },
    })
    setCurrent(c)
  }

  return (
    <ReadAndEdit
      read={() => (
        <Fieldset title={ACTIVITIES_COMPANY[type]}>
          <div className="uppercase font-bold">{current?.name || '---'}</div>
        </Fieldset>
      )}
      edit={(close) => (
        <Fieldset title={ACTIVITIES_COMPANY[type]}>
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
