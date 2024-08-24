import { cave } from '@/utils/cave'
import { useEffect, useRef, useState } from 'react'

export function useCave(
  action,
  config = {
    enabled: true,
    params: {},
  }
) {
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

    try {
      const response = await cave(action, {
        signal: signalRef.current.signal,
        ...config,
        body: form || config.body,
      })

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
    const keyEnabledIsExist = Object.keys(config).includes('enabled')

    if (keyEnabledIsExist && !config.enabled) return
    handleFetch()

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
