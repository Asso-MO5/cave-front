'use client'
import { useContext } from 'react'

import { CrudRefCtx } from './context'

export function useCrudRef() {
  const ctx = useContext(CrudRefCtx)
  if (ctx === undefined) {
    throw new Error(
      `useCrud must be used within a Provider for context crudItem`
    )
  }
  return ctx
}
