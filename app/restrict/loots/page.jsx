import dynamic from 'next/dynamic'

const PublicLoots = dynamic(
  () => import('@/components/loots/PublicLoots').then((mod) => mod.PublicLoots),
  {
    ssr: false,
  }
)

export default async function PublicLootsPage() {
  return <PublicLoots />
}
