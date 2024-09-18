'use client'
import { useContext } from 'react'
import { CrudItemCtx } from './ItemCtx'

export function useCrudItem() {
  const ctx = useContext(CrudItemCtx)
  if (ctx === undefined) {
    throw new Error(
      `useCrud must be used within a Provider for context crudItem`
    )
  }
  return ctx
}
