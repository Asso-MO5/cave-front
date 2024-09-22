'use client'

import dynamic from 'next/dynamic'

const EditorRead = dynamic(
  () => import('./../EditorRead').then((mod) => mod.EditorRead),
  {
    ssr: false,
  }
)

export function Public({ item }) {
  console.log('Item:', item.long_short_description)
  return (
    <div className="p-4 sm:grid grid-cols-[4fr_1fr] gap-4 flex flex-col ">
      <div>
        <EditorRead content={item.long_short_description} />
      </div>
      <div>
        <h1>{item.name}</h1>
        <p></p>
      </div>
    </div>
  )
}
