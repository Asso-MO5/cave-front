'use client'
import { useContext } from 'react'
import { getOrCreateContext } from './utils'
import { CrudProvider } from './provider'
import './types' // Import the Method type

/**
 * Retrieves the CRUD context.
 *
 * @typedef {Object} Return
 * @property {Method } Return.get
 * @property {Method } Return.delete
 * @property {Method } Return.update
 * @property {Method } Return.create
 *
 * @param {string} name - The name of the context.
 * @see {@link CrudProvider}
 * @see {@link Method}
 * @see {@link Return}
 * @returns { Return } Return - object containing the CRUD methods.
 * @throws Will throw an error if not used within a valid Provider.
 */
export function useCrud(name) {
  const ctx = useContext(getOrCreateContext(name))
  if (ctx === undefined) {
    throw new Error(
      `useCrud must be used within a Provider for context named ${name}`
    )
  }

  return ctx() // Assumes that ctx returns an object containing the CRUD methods
}
