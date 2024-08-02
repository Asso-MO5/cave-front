import { LoginButton } from '@/components/login-button'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Login() {
  // ====== HOOKS ========================================
  const session = await auth()

  // ====== HANDLERS =======================================²

  // ====== RENDERS ========================================
  if (session?.user) redirect('/admin')

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Cave MO5</h1>
      <LoginButton />
    </main>
  )
}
