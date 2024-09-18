'use client'

import { CrudItemCtx } from './ItemCtx'

export function CrudItemProvider({ children, crud }) {
  return <CrudItemCtx.Provider value={crud}>{children}</CrudItemCtx.Provider>
}
