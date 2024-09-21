'use client'
import dynamic from 'next/dynamic'

const SessionProvider = dynamic(
  () =>
    import('@/components/SessionProvider').then((mod) => mod.SessionProvider),
  {
    ssr: false,
  }
)
export function PageList({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
