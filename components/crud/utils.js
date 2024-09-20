import { createContext } from 'react'

const Contexts = {}

export function getOrCreateContext(entityName) {
  if (!Contexts[entityName]) Contexts[entityName] = createContext({})
  return Contexts[entityName]
}
