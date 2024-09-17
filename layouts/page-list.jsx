'use client'
import { SessionProvider } from '@/components/SessionProvider'

export function PageList({ children, title, actions, session }) {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col gap-3 h-full">
        {(title || actions) && (
          <header className="flex items-center justify-between">
            <h1 className="pl-5 text-2xl font-bold">{title}</h1>
            <div className="flex gap-2">{actions}</div>
          </header>
        )}
        <section className="flex-1 overflow-hidden">
          <div className="relative h-full">
            <div className="absolute inset-0 overflow-y-auto">{children}</div>
          </div>
        </section>
      </div>
    </SessionProvider>
  )
}
