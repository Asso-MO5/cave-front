'use client'
import { Fieldset } from '@/ui/Fieldset'
import { Varchar } from '../fields/Varchar'
import { Status } from '../item/Status'
import { operations } from '@/_api/operations'
import { Media } from '../media/Media'
import { useMemo } from 'react'
import { Crud } from './ref/Crud'
import { Editor } from '../Editor'
import { useCrud } from '../crud/useCrud'
import { PrintSelector } from './PrintSelector'
import { PRINT_TYPES, TXT_LONGS, TXT_VARS } from './cartel.utils'
import { AddBtn } from '../media/AddBtn'

const { putItemIdStatusStatus } = operations

export function Cartel() {
  const {
    get: { data: cartel },
    update: { action: update },
    delete: { action: del },
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

  const isLock = cartel?.status === 'published'

  const printTypes = PRINT_TYPES.filter((type) =>
    cartel.relations.some((r) => type.types.includes(r.type))
  )

  if (!cartel) return null
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
            <PrintSelector
              id={cartel.id}
              name={cartel.name}
              types={printTypes}
            />
          </div>

          {TXT_LONGS.filter(({ key }) =>
            isLock
              ? cartel?.[key]?.reduce((acc, block) => {
                  block?.content?.forEach((content) => {
                    if (content?.text?.length) acc += content.text.length
                  })

                  return acc
                }, 0) || 0 > 0
              : true
          ).map(({ label, key }) => (
            <Fieldset title={label} key={key}>
              <Editor
                id={key}
                defaultValue={cartel[key]}
                onChange={(value) => update({ [key]: value })}
                disabled={cartel.status === 'published'}
                limits={printTypes}
              />
            </Fieldset>
          ))}

          <div className="flex flex-col gap-3 my-2">
            <div className="flex justify-center">
              <div className="w-full">
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
            <div className="flex gap-2 flex-wrap justify-center items-center text-sm">
              {cartel?.medias
                .filter((m) => m.relation_type !== 'cover')
                .map((media) => (
                  <div key={media.id} className="max-w-60 h-auto">
                    <Media
                      defaultImg={{
                        src: media.url,
                        alt: 'img',
                      }}
                      updateUrl={(url) =>
                        update({ url, media: media.relation_type })
                      }
                      updateId={(id) =>
                        update({ id, media: media.relation_type })
                      }
                      updateLocal={(file) =>
                        update({ file, media: media.relation_type })
                      }
                      deleteMedia={() => del(media.id)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:max-w-72">
          <Media
            defaultImg={cover}
            updateUrl={(url) => update({ url, media: 'cover' })}
            updateId={(id) => update({ id, media: 'cover' })}
            updateLocal={(file) => update({ file, media: 'cover' })}
            deleteMedia={() => del(cover.id)}
          />

          {cartel.relations.map((item) => (
            <Crud item={item} key={item.id} />
          ))}

          {Object.entries(TXT_VARS).map(([key, title]) => (
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
