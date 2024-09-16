import { getCookie } from './get-cookie'
const isTestMode = process.env.NODE_ENV === 'test'

/**
 *
 * @description
 * - Crée une requête fetch avec des en-têtes personnalisés et retourne la réponse.
 * - fonction de Fetch, qui s'auto mock en mode test.
 *
 * @param {string} verb - Méthode HTTP de la requête (GET, POST, PUT, DELETE).
 * @param {AbortSignal} signal - Signal d'annulation pour la requête fetch.
 * @param {string} url - URL de la ressource à laquelle accéder.
 * @param {BodyInit} [body] - Corps de la requête pour les méthodes POST et PUT.
 *
 * @returns {Promise<Response>} - Promesse qui résout la réponse de la requête fetch.
 */
async function _fetch(verb, signal, url, body) {
  if (isTestMode) {
    console.log(`Mode test activé: Simuler une requête ${verb} à l'URL ${url}`)
    return new Response(JSON.stringify({ success: true, data: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: verb,
    signal,
    headers: {
      Authorization: 'Bearer ' + getCookie('api_token'),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
}

async function _post(signal, url, body) {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: 'POST',
    signal,
    headers: {
      Authorization: 'Bearer ' + getCookie('api_token'),
    },
    body: JSON.stringify(body),
  })
}

async function _postFile(signal, url, body, verb = 'POST') {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: verb,
    signal,
    headers: {
      Authorization: 'Bearer ' + getCookie('api_token'),
    },
    body,
  })
}

async function _put(signal, url, body) {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: 'PUT',
    signal,
    headers: {
      Authorization: 'Bearer ' + getCookie('api_token'),
    },
    body: JSON.stringify(body),
  })
}

/**
 * Objet contenant des fonctions pour effectuer des requêtes fetch.
 */
export const fetcher = {
  async get(url, signal) {
    return await _fetch('GET', signal, url)
  },
  async post(url, signal, body) {
    return await _post(signal, url, body)
  },
  async postFile(url, signal, body) {
    return await _postFile(signal, url, body)
  },
  async putFile(url, signal, body) {
    return await _postFile(signal, url, body, 'PUT')
  },
  async put(url, signal, body) {
    return await _put(signal, url, body)
  },
  async delete(url, signal) {
    return await _fetch('DELETE', signal, url)
  },
}
