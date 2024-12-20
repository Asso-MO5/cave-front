import { auth } from '@/auth'

export async function caveSSR(path, config) {
  const session = await auth()
  const url = path.replace(
    /{([^}]*)}/g,
    (_, key) => config?.params?.[key] || key
  )

  const method = config?.method || 'get'

  const params = new URLSearchParams()
  if (config.query) {
    Object.keys(config.query).forEach((key) => {
      params.append(key, config.query[key])
    })
  }

  const finaleUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }${url}?${params.toString()}`

  const headers = {}

  if (!config.noToken) {
    headers.Authorization = `Bearer ${session.api_token}`
  }
  return await fetch(finaleUrl, {
    method: method.toUpperCase(),
    signal: config?.signal || undefined,
    headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
  })
}
