export class ApiService {
  /**
   * @description Roles nécessaires pour accéder à cet endpoint
   * @type {Array<string>}
   */
  roles = []
  /**
   * @description Verbe HTTP utilisé pour l'appel
   * @type { 'GET' | 'POST' | 'PUT' | 'DELETE' }
   */
  verb = 'GET'

  /**
   * @description Endpoint de l'API
   * @type {string}
   * @example '/games'
   * @example '/game/{slug}'
   * @example '/items/{id}/status/{status}'
   **/
  endpoint = ''

  /**
   * @description signal pour annuler les requêtes
   * @type {AbortSignal | null}
   */
  abortController = null

  constructor(baseURL) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL
  }

  bindModel(data, Model) {
    try {
      return new Model(data)
    } catch (error) {
      console.error('Model error:', error)
      return data
    }
  }
  /**
   * Méthode pour récupérer le Bearer Token
   * @param {object} [context={}] - Contexte (cookies en SSR, localStorage côté client)
   * @returns {string} - Le Bearer Token
   */
  getBearerToken(context = {}) {
    // Gestion du token côté serveur (via cookies)
    if (typeof window === 'undefined') return context?.api_token || ''
    // Gestion du token côté client (via localStorage ou props)
    return context?.token || this.getCookie()
  }

  getCookie() {
    if (typeof document === 'undefined') return null
    const cookies = document.cookie.split(';')
    const cookie = cookies.find((c) => c.includes('api_token'))
    if (!cookie) return null
    return cookie.split('=')[1]
  }

  get signal() {
    return this.abortController?.signal
  }

  abort() {
    if (this.abortController) this.abortController.abort()
  }
  /**
   * Méthode pour effectuer un appel fetch
   * @params { string } endpoint - L'endpoint de l'API
   * @params { string } method - La méthode HTTP de la requête
   * @params { Object } config
   * @params { string } config.endpoint - L'endpoint de l'API
   * @returns {Promise<object>} - La réponse transformée en objet JSON
   */
  async fetchData(config) {
    const { context, headers, body, params, query } = config
    const queryParams = new URLSearchParams(query).toString()

    const url =
      this.baseURL +
      this.endpoint.replace(/{([^}]*)}/g, (_, key) => params?.[key]) +
      (queryParams ? `?${queryParams}` : '')

    const token = this.getBearerToken(context)

    // Initialiser un nouvel AbortController pour chaque requête
    this.abortController = new AbortController()

    const options = {
      method: this.verb,
      signal: this.abortController.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }

    if (body) options.body = JSON.stringify(body)

    try {
      const response = await fetch(url, options)

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)

      return response
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }
}
