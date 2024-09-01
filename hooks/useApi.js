import { useSession } from '@/components/SessionProvider'
import { useState, useEffect, useCallback } from 'react'

/**
 * Hook personnalisé pour gérer les appels API en utilisant les classes générées.
 * @param {class} ApiClass - La classe API générée à utiliser pour l'appel
 * @param {object} options - Les options pour configurer le hook
 * @param {boolean} [options.autoFetch=true] - Si true, effectue automatiquement le fetch au montage si la méthode est GET
 * @param {object} [options.params={}] - Les paramètres de requête ou de mutation à passer à la classe API
 * @param {object} [options.context={}] - Le contexte pour passer des informations supplémentaires comme les headers ou les tokens
 * @returns {object} - Contient { data, loading, error, refetch, mutate }
 */
export function useApi(ApiClass, config = {}) {
  const { autoFetch = true, params = {}, context = {} } = config

  const session = useSession()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiInstance = new ApiClass()

  const fetchData = useCallback(
    async (payload) => {
      setLoading(true)
      setError(null)

      try {
        const result = await apiInstance.execute({
          ...config,
          ...payload,
          context: { userRoles: session?.user.roles.map((r) => r.name) || [] },
        })

        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [params, context]
  )

  useEffect(() => {
    if (apiInstance.verb === 'GET' && autoFetch) fetchData()

    return () => {
      if (loading) apiInstance.abort()
    }
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    [apiInstance.verb === 'GET' ? 'refetch' : 'mutate']: fetchData,
  }
}
