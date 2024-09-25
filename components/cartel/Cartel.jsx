'use client'
import { Fieldset } from '@/ui/Fieldset'
import { Varchar } from '../fields/Varchar'
import { Status } from '../item/Status'
import { operations } from '@/_api/operations'
import { MediaAdd } from '../MediaAdd'
import { useMemo } from 'react'
import { Crud } from './ref/Crud'
import { Editor } from '../Editor'
import { useCrud } from '../crud/useCrud'
import { PrintSelector } from './PrintSelector'
import { PRINT_TYPES, PRINT_TYPES_GAME } from './cartel.utils'
import { AddBtn } from '../media/AddBtn'
import { MediaReadEdit } from '../MediaReadEdit'

const { putItemIdStatusStatus } = operations

const txtVarchars = {
  var_place: 'Emplacement',
  var_origin: 'Provenance',
  var_price: 'Prix',
  var_release_fr: 'Date de sortie',
  var_release_eu: 'Date de sortie EUR',
  var_release_jap: 'Date de sortie JAP',
  var_release_us: 'Date de sortie USA',
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

export function Cartel() {
  const {
    get: { data: cartel },
    update: { action: update },
  } = useCrud('cartel')

  const cover = useMemo(() => {
    const cover = cartel?.medias?.find(
      (media) => media.relation_type === 'cover'
    )
    return {
      alt: cover?.alt,
      src: cover?.url,
    }
  }, [cartel])

  const isLock = cartel.status === 'published'

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
          <div className="mb-2">
            <PrintSelector id={cartel.id} name={cartel.name} />
          </div>

          {longText
            .filter(({ key }) =>
              isLock
                ? cartel?.[key]?.reduce((acc, block) => {
                    block?.content?.forEach((content) => {
                      if (content?.text?.length) acc += content.text.length
                    })

                    return acc
                  }, 0) || 0 > 0
                : true
            )
            .map(({ label, key }) => (
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

          <div className="flex flex-col gap-3 my-2">
            <div className="flex justify-center">
              <div>
                <AddBtn
                  updateUrl={(url) =>
                    update({ url, media: 'media', create: true })
                  }
                  updateId={(id) =>
                    update({ id, media: 'media', create: true })
                  }
                  updateLocal={(file) =>
                    update({ file, media: 'media', create: true })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {cartel?.medias.map((media) => (
                <div key={media.id} className="max-w-60 h-auto">
                  <MediaReadEdit
                    url={media.url}
                    name={media.alt}
                    update={(payload) =>
                      update({ ...payload, media: media.id })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:max-w-64">
          <MediaAdd
            defaultImg={cover}
            updateUrl={(url) => update({ url, media: 'cover' })}
            updateId={(id) => update({ id, media: 'cover' })}
            updateLocal={(file) => update({ file, media: 'cover' })}
          />

          {cartel.relations.map((item) => (
            <Crud item={item} key={item.id} />
          ))}

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
