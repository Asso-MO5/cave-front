import { fetcher } from '@/utils/fetcher'
import { useEffect, useRef, useState } from 'react'

/**
 *
 * @param {Object} props
 * @param {string} props.url - URL de la ressource à laquelle accéder.
 * @param {string} [props.method='get'] - Méthode HTTP de la requête (GET, POST, PUT, DELETE).
 * @param {Object} [props.body=undefined] - Corps de la requête pour les méthodes POST et PUT.
 * @param {Object} [props.params={}] - Paramètres de la requête.
 * @param {boolean} [props.enabled=true] - Indique si la requête doit être effectuée.
 * @returns {Object} - Objet contenant les props de la requête.
 * @returns
 */
export function useFetch(props) {
  const {
    url: _url,
    method = 'get',
    body = undefined,
    params: _params = {},
    enabled = true,
  } = props
  const signalRef = useRef(new AbortController())
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    nextCursor: null,
    pageSize: 10,
    totalItems: 0,
    totalPage: 0,
  })

  const handleFetch = async (form = undefined) => {
    if (loading || !signalRef.current) return
    setLoading(true)
    setError(null)
    const params = new URLSearchParams(_params)

    try {
      const response = await fetcher[method.toLowerCase()](
        `${_url}?${params.toString()}`,
        signalRef.current.signal,
        form || body
      )
      const data = await response.json()

      if (!response.ok) {
        setError(data)
      } else {
        if (data.pagination) {
          setPagination(data.pagination)
          setData(data.data)
        } else {
          setData(data)
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) handleFetch()
    return () => {
      if (signalRef.current && loading) signalRef.current?.abort?.()
    }
  }, [])

  return {
    loading,
    data,
    error,
    pagination,
    refetch: (form) => handleFetch(form),
  }
}
