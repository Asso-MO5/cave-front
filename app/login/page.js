import { LoginButton } from '@/components/login-button'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default async function Login() {
  // ====== HOOKS ========================================
  const session = await getServerSession(authOptions)

  // ====== HANDLERS =======================================²
  const handleClick = () => {
    signIn('discord')
  }

  // ====== RENDERS ========================================
  if (session?.user) redirect('/admin')

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Cave MO5</h1>
      <LoginButton onClick={handleClick} />
    </main>
  )
}
