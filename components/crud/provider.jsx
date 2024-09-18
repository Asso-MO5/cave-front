'use client'

import { getOrCreateContext } from './utils'
import './types' // Import the Method type

export function CrudProvider({ children, name, crud }) {
  const Ctx = getOrCreateContext(name)
  return <Ctx.Provider value={() => crud}>{children}</Ctx.Provider>
}
