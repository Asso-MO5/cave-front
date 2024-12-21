'use client'

import { Button } from '@/ui/Button'
import { Fieldset } from '@/ui/Fieldset'
import { fetcher } from '@/utils/fetcher'
import { getCookie, setCookie } from '@/utils/get-cookie'
import { useEffect, useState } from 'react'

export function RestrictedModal({ page }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState(getCookie('api_token') || '')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    setError('')
    e.preventDefault()
    await checkIsValid()
  }

  const checkIsValid = async () => {
    const ctrl = new AbortController()
    const res = await fetcher.post('/auth/restricted', ctrl.signal, { code })
    if (res.ok) {
      setIsAuthenticated(true)
      setCookie('api_token', code)
    } else {
      setIsAuthenticated(false)
      setError('Code incorrect')
      setCookie('api_token', '')
      setCode('')
    }

    return res.ok
  }

  useEffect(() => {
    if (code) checkIsValid()
  }, [])

  if (isAuthenticated) return page

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black" />
      <div className="relative bg-mo-bg p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Accès restreint</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Fieldset title="Code" required>
            <input
              type="password"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Fieldset>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Button type="submit">Valider</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
