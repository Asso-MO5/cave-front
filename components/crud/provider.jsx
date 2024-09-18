'use client'

import { getOrCreateContext } from './utils'

export function CrudProvider({ children, name, crud }) {
  const Ctx = getOrCreateContext(name)
  return <Ctx.Provider value={() => crud}>{children}</Ctx.Provider>
}
