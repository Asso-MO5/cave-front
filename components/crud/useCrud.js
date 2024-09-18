'use client'
import { useContext } from 'react'
import { getOrCreateContext } from './utils'

export function useCrud(name) {
  const ctx = useContext(getOrCreateContext(name))
  if (ctx === undefined) {
    throw new Error(
      `useCrud must be used within a Provider for context named ${name}`
    )
  }

  return ctx() // Assumes that ctx returns an object containing the CRUD methods
}
