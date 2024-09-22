export async function cavePublicSSR(path, config) {
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

  return await fetch(finaleUrl, {
    method: method.toUpperCase(),
    signal: config?.signal || undefined,
    body: config.body ? JSON.stringify(config.body) : undefined,
  })
}
