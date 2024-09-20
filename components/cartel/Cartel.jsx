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

const { putItemIdStatusStatus } = operations

const txtVarchars = {
  var_place: 'Emplacement',
  var_origin: 'Provenance',
  var_release_fr: 'Date de sortie Française',
  var_release_jap: 'Date de sortie japonnaise',
  var_release_us: 'Date de sortie USA',
}

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
          <Fieldset title="Description Courte">
            <Editor
              id="short_description"
              defaultValue={cartel.long_short_description}
              onChange={(long_short_description) =>
                update({ long_short_description })
              }
              disabled={cartel.status === 'published'}
            />
          </Fieldset>

          <Fieldset title="Description">
            <Editor
              id="description"
              defaultValue={cartel.long_description}
              onChange={(long_description) => update({ long_description })}
              disabled={cartel.status === 'published'}
            />
          </Fieldset>
        </div>
        <div className="flex flex-col gap-2 sm:max-w-64">
          <MediaAdd
            defaultImg={cover}
            updateUrl={(cover_url) => update({ cover_url })}
            updateId={(cover_id) => update({ cover_id })}
            updateLocal={(cover_file) => update({ cover_file })}
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
