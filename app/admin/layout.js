import { auth } from '@/auth'
import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'
import { redirect } from 'next/navigation'
import { ToastProvider } from '@/ui/ToastProvider'
import { SetCookie } from '@/components/SetCookie'
import { Panel } from '@/components/Panel'

export const metadata = {
  title: 'Cave MO5',
  description: 'Appi de gestion',
}

export const runtime = 'edge'

export default async function AdminLayout({ children }) {
  // ====== HOOKS =========================================
  const session = await auth()

  // ====== RENDERS =======================================
  if (!session?.user) redirect('/login')

  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        <div className="h-[100dvh] grid grid-cols-[0_1fr] sm:grid-cols-[auto_1fr]">
          <SetCookie name="api_token" value={session.api_token} />
          <Panel session={session} />
          <main className="p-2">
            {children}
            <ToastProvider />
          </main>
        </div>
      </body>
    </html>
  )
}
