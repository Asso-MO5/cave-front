'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { TXT_LONGS, TXT_VARS } from '../cartel/cartel.utils'
import { MediaSelector } from '../media/MediaSelector'
import { Fieldset } from '@/ui/Fieldset'
import { ACTIVITIES_COMPANY } from '@/utils/constants'

const EditorRead = dynamic(
  () => import('./../EditorRead').then((mod) => mod.EditorRead),
  {
    ssr: false,
  }
)

export function Public({ item }) {
  const cover = useMemo(() => {
    const cover = item?.medias?.find((media) => media.relation_type === 'cover')
    return {
      alt: cover?.alt,
      url: cover?.url,
    }
  }, [item])

  const companies = Object.keys(ACTIVITIES_COMPANY).filter(
    (key) => !!item[key]?.name
  )

  return (
    <div className="p-2">
      <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-between items-center sticky top-0 bg-mo-bg p-2 z-[500]">
        <div className="font-bold text-xl sm:text-2xl w-full ">{item.name}</div>
      </div>

      <div className="sm:flex-row flex flex-col-reverse gap-6 w-full">
        <div className="flex-1">
          {TXT_LONGS.filter(
            ({ key }) =>
              item?.[key]?.reduce((acc, block) => {
                block?.content?.forEach((content) => {
                  if (content?.text?.length) acc += content.text.length
                })

                return acc
              }, 0) || 0 > 0
          ).map(({ label, key }) => (
            <Fieldset title={label} key={key}>
              <EditorRead value={item[key]} />
            </Fieldset>
          ))}

          <div className="flex flex-col gap-3 my-2">
            <div className="flex gap-2 flex-wrap justify-center items-center text-sm">
              {item?.medias
                .filter((m) => m.relation_type !== 'cover')
                .map((media) => (
                  <div key={media.id} className="max-w-60 h-auto">
                    <MediaSelector url={media.url} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:max-w-72">
          <MediaSelector url={cover.url} />

          {companies.map((companyType) => (
            <Fieldset key={companyType} title={ACTIVITIES_COMPANY[companyType]}>
              <div>{item[companyType]?.name}</div>
            </Fieldset>
          ))}
          {/* cartel.relations.map((item) => (
            <Crud item={item} key={item.id} />
          )) */}

          {Object.entries(TXT_VARS)
            .filter(([key]) => key !== 'place')
            .filter(([key]) => !!item[key])
            .map(([key, title]) => (
              <Fieldset title={title} key={key}>
                <div>{item[key]}</div>
              </Fieldset>
            ))}
        </div>
      </div>
    </div>
  )
}
