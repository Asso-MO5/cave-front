'use client'

import { CrudRefCtx } from './context'

export function CrudRefProvider({ children, crud }) {
  return <CrudRefCtx.Provider value={crud}>{children}</CrudRefCtx.Provider>
}
