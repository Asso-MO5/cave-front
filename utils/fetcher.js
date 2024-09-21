import { getCookie } from './get-cookie'

async function _fetch(verb, signal, url, body) {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: verb,
    signal,
    headers: {
      Authorization: 'Bearer ' + getCookie('api_token'),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
}

async function _fetchFile(verb, signal, url) {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: verb,
    signal,
    headers: {
      Authorization: 'Bearer ' + getCookie('api_token'),
    },
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
  async getFile(url, signal) {
    return await _fetchFile('GET', signal, url)
  },
}
