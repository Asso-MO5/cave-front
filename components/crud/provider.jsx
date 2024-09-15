'use client'

import { getOrCreateContext } from './utils'
import { useCrud } from './useCrud'
import './types' // Import the Method type

/**
 * Provides a CRUD context. Use with `useCrud`.
 *
 * @see {@link useCrud}
 * @see {@link Method}
 *
 * @example
 * <Provider name="items" crud={{
 *   get: { data, loading, action: () => {} },
 *   update: { data, loading, action: () => {} },
 *   create: { data, loading, action: () => {} },
 *   delete: { data, loading, action: () => {} }
 * }}>
 *   {children}
 * </Provider>
 *
 * @param {Object} props - The props object.
 * @param {JSX.Element} props.children - The child components.
 * @param {string} props.name - The name of the context.
 * @param {Object} props.crud - The CRUD operations object.
 * @param {Method} props.crud.get - The method for fetching data.
 * @param {Method} props.crud.update - The method for updating data.
 * @param {Method} props.crud.create - The method for creating new data.
 * @param {Method} props.crud.delete - The method for deleting data.
 *
 * @returns {JSX.Element} The context provider component.
 */
export function CrudProvider({ children, name, crud }) {
  const Ctx = getOrCreateContext(name)
  return <Ctx.Provider value={() => crud}>{children}</Ctx.Provider>
}
