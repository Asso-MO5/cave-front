'use client'
import { useContext } from 'react'
import { getOrCreateContext } from './utils'
import { CrudProvider } from './provider'
import './types' // Import the Method type

/**
 * Retrieves the CRUD context.
 *
 * @param {string} name - The name of the context.
 * @see {@link CrudProvider}
 * @see {@link Method}
 * @returns {Object} An object containing the CRUD methods.
 * @returns {Method} get - The method for fetching data.
 * @returns {Method} update - The method for updating data.
 * @returns {Method} create - The method for creating data.
 * @returns {Method} delete - The method for deleting data.
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
