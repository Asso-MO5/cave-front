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
   * @description signal pour annuler les requêtes
   * @type {AbortSignal | null}
   */
  abortController = null

  constructor(baseURL = process.env.NEXT_PUBLIC_API_URL) {
    this.baseURL = baseURL
  }

  bindModel(data, Model) {
    return new Model(data)
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
    return context?.token || localStorage.getItem('api_token') || ''
  }

  get signal() {
    return this.abortController?.signal
  }

  abort() {
    if (this.abortController) this.abortController.abort()
  }
  /**
   * Méthode pour effectuer un appel fetch
   * @param {string} endpoint - Le chemin de l'API
   * @param {string} method - La méthode HTTP (GET, POST, PUT, DELETE)
   * @param {object} [body=null] - Le corps de la requête pour les méthodes POST/PUT
   * @param {object} [headers={}] - Les en-têtes de la requête
   * @param {boolean} [ssr=false] - Indicateur pour le SSR
   * @param {object} [context={}] - Contexte (SSR)
   * @returns {Promise<object>} - La réponse transformée en objet JSON
   */
  async fetchData(
    endpoint,
    method = 'GET',
    body = null,
    headers = {},
    ssr = false,
    context = {}
  ) {
    const url = ssr ? this.baseURL + endpoint : endpoint
    const token = this.getBearerToken(context)

    // Initialiser un nouvel AbortController pour chaque requête
    this.abortController = new AbortController()

    const options = {
      method,
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

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }
}
