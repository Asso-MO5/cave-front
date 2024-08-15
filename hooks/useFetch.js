import { fetcher } from '@/utils/fetcher'
import { useEffect, useState } from 'react'

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
  const signal = new AbortController().signal
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    nextCursor: null,
    pageSize: 10,
    totalItems: 0,
    totalPage: 0,
  })

  const handleFetch = async (form = undefined) => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams()
    Object.entries(_params).forEach(([key, value]) => {
      params.append(key, value)
    })
    const url = _url + '?' + params.toString()

    try {
      const response = await fetcher[method.toLowerCase()](
        url,
        signal,
        form || body
      )
      const data = await response.json()

      if (!response.ok) {
        setError(data)
        return
      }

      if (Object.keys(data).includes('pagination')) {
        setPagination(data.pagination)
        setData(data.data)
      } else {
        setData(data)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) handleFetch()
  }, [])

  return {
    loading,
    data,
    error,
    pagination,
    refetch: (form) => handleFetch(form),
  }
}
