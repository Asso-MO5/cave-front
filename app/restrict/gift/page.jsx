import dynamic from 'next/dynamic'

const Check = dynamic(
  () => import('@/components/gift/Check').then((mod) => mod.Check),
  {
    ssr: false,
  }
)

export default async function restrictGiftCheck() {
  return <Check />
}
