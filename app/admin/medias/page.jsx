import { auth } from '@/auth'

import { MediaList } from '@/components/MediasList'
import { PageList } from '@/layouts/page-list'

import dynamic from 'next/dynamic'

export default async function Medias() {
  const session = await auth()
  return (
    <PageList title="Medias" session={session}>
      <MediaList />
    </PageList>
  )
}
