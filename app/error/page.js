import { auth } from '@/auth'
export const runtime = 'edge'

export default async function Login() {
  // ====== HOOKS ========================================
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Cave MO5</h1>
      {JSON.stringify(session)}
    </main>
  )
}
