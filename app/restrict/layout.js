import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'
import { ToastProvider } from '@/ui/ToastProvider'
import { auth } from '@/auth'
import { SetCookie } from '@/components/SetCookie'
import { RestrictedModal } from '@/components/RestrictedModal'

export const metadata = {
  title: 'Cave MO5',
  description: 'Contrôle des entrées',
}

export const runtime = 'edge'

export default async function RestrictLayout({ children }) {
  // ====== HOOKS =========================================
  const session = await auth()

  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        <div className="h-[100dvh] grid grid-cols-[1fr]">
          {session?.api_token && (
            <SetCookie name="api_token" value={session.api_token} />
          )}
          <main className="p-2">
            {session?.api_token ? (
              children
            ) : (
              <RestrictedModal page={children} />
            )}
            <ToastProvider />
          </main>
        </div>
      </body>
    </html>
  )
}
