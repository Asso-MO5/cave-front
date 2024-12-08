import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'
import { ToastProvider } from '@/ui/ToastProvider'

export const metadata = {
  title: 'Cave MO5',
  description: 'Appi de gestion',
}

export const runtime = 'edge'

export default async function RestrictLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        <div className="h-[100dvh] grid grid-cols-[0_1fr] sm:grid-cols-[auto_1fr]">
          {/* <SetCookie name="api_token" value={session.api_token} /> */}
          <main className="p-2">
            {children}
            <ToastProvider />
          </main>
        </div>
      </body>
    </html>
  )
}
