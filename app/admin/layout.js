import { auth } from '@/auth'
import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'
import { redirect } from 'next/navigation'
import { Panel } from '@/components/panel'
import { ToastProvider } from '@/ui/toast-provider'
import QueryProviders from '@/layouts/query-provider'

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
        <div className="h-[100dvh] grid grid-cols-[auto_1fr]">
          <Panel session={session} />
          <main className="p-2">
            <QueryProviders>{children}</QueryProviders>
            <ToastProvider />
          </main>
        </div>
      </body>
    </html>
  )
}
