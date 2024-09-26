'use client'
import { Fieldset } from '@/ui/Fieldset'
import { Varchar } from '../fields/Varchar'
import { Status } from '../item/Status'
import { operations } from '@/_api/operations'
import { MediaAdd } from '../media/Media'
import { useMemo } from 'react'
import { Editor } from '../Editor'
import { useCrud } from '../crud/useCrud'
import { PRINT_TYPES, PRINT_TYPES_GAME } from './cartel.utils'
import { AddBtn } from '../media/AddBtn'
import { ACTIVITIES_COMPANY } from '@/utils/constants'

const { putItemIdStatusStatus } = operations

const txtVarchars = {
  var_origin: 'Origine',
  var_borned_at: 'Date de création',
}

const longText = [
  {
    label: 'Description courte',
    key: 'long_short_description',
  },
  {
    label: 'Description FR',
    key: 'long_description_fr',
  },
  {
    label: 'Description EN',
    key: 'long_description_en',
  },
]

export function Company() {
  const {
    get: { data: cartel },
    update: { action: update },
  } = useCrud('company')

  const cover = useMemo(() => {
    const cover = cartel?.medias?.find(
      (media) => media.relation_type === 'cover'
    )
    return {
      alt: cover?.alt,
      src: cover?.url,
    }
  }, [cartel])

  return (
    <div className="p-2">
      <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-between items-center sticky top-0 bg-mo-bg p-2 z-[500]">
        <div className="font-bold text-xl sm:text-2xl w-full ">
          <Varchar
            defaultValue={cartel.name}
            update={(name) => update({ name })}
            disabled={cartel.status === 'published'}
          />
        </div>
        <div className="self-end">
          <Status
            item={cartel}
            rolesCanEdit={putItemIdStatusStatus.roles}
            update={(status) => update({ status })}
          />
        </div>
      </div>

      <div className="sm:flex-row flex flex-col-reverse gap-6 w-full">
        <div className="flex-1">
          {longText.map(({ label, key }) => (
            <Fieldset title={label} key={key}>
              <Editor
                id={key}
                defaultValue={cartel[key]}
                onChange={(value) => update({ [key]: value })}
                disabled={cartel.status === 'published'}
                limits={
                  cartel?.relations?.[0]?.type === 'game'
                    ? PRINT_TYPES_GAME
                    : PRINT_TYPES
                }
              />
            </Fieldset>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:max-w-64">
          <MediaAdd
            defaultImg={cover}
            updateUrl={(url) => update({ url, media: 'cover' })}
            updateId={(id) => update({ id, media: 'cover' })}
            updateLocal={(file) => update({ file, media: 'cover' })}
          />

          <Fieldset title="Activités">
            <div className="flex flex-col gap-2">
              {cartel.alternatives.map((alt) => (
                <div key={alt.id}>{ACTIVITIES_COMPANY?.[alt.type]}</div>
              ))}
            </div>
          </Fieldset>

          {Object.entries(txtVarchars).map(([key, title]) => (
            <Fieldset title={title} key={key}>
              <Varchar
                placeholder={title}
                defaultValue={cartel[key]}
                update={(value) => update({ [key]: value })}
                disabled={cartel.status === 'published'}
              />
            </Fieldset>
          ))}
        </div>
      </div>
    </div>
  )
}
