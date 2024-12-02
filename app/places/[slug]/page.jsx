import { operations } from '@/_api/operations'
import { cavePublicSSR } from '@/utils/cave-public-ssr'
import { redirect } from 'next/navigation'

const { getItemPublicId } = operations

export default async function Item({ params: { slug } }) {
  const ctrl = new AbortController()

  const params = new URLSearchParams()

  params.append('slug', slug.toLowerCase())

  const res = await cavePublicSSR(getItemPublicId.path, {
    signal: ctrl.signal,
    params: { id: `place_${params.get('slug')}` },
  })

  const { items, total } = await res.json()

  if (!total) return redirect('/404')

  if (total === 1) return redirect(`/fiches/${items[0].id}`)

  if (total > 1) return redirect(`/fiches?place=${slug}`)

  return null
}
