import { createContext, useContext } from 'react'

const ctx = createContext()

export function SessionProvider({ children, session }) {
  return <ctx.Provider value={session}>{children}</ctx.Provider>
}

export function useSession() {
  if (!useContext(ctx))
    throw new Error('useSession must be used within a SessionProvider')
  return useContext(ctx)
}
