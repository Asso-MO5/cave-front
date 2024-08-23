const { createContext, useContext } = require('react')

const Ctx = createContext()

export function SessionProvider({ children, session }) {
  return <Ctx.Provider value={session}>{children}</Ctx.Provider>
}

export function useSession() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSession must be used within a SessionProvider')
  return ctx
}
