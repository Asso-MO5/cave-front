import dynamic from 'next/dynamic'

const Public = dynamic(
  () => import('@/components/items/Public').then((mod) => mod.Public),
  {
    ssr: false,
  }
)

export const runtime = 'edge'

export default async function Items() {
  return <Public />
}
