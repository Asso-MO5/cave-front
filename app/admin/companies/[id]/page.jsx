import { operations } from '@/_api/operations'
import { auth } from '@/auth'
import { PageList } from '@/layouts/page-list'
import { caveSSR } from '@/utils/cave-ssr'
import dynamic from 'next/dynamic'

const { getCompaniesId } = operations

const Crud = dynamic(
  () => import('@/components/companies/Crud').then((mod) => mod.Crud),
  {
    ssr: false,
  }
)

export default async function Company({ params: { id } }) {
  const session = await auth()
  const ctrl = new AbortController()
  const res = await caveSSR(getCompaniesId.path, {
    signal: ctrl.signal,
    params: { id },
    method: getCompaniesId.method,
  })

  const company = await res.json()

  return (
    <PageList session={session}>
      <Crud company={company} />
    </PageList>
  )
}
