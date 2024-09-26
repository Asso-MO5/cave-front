import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'

export const metadata = {
  title: 'Cave MO5',
  description: 'Appi de gestion',
}

export const runtime = 'edge'

export default async function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        <div className="h-[100dvh] grid grid-rows-[auto_1fr]">
          <header className="p-2 justify-between gap-2 items-center flex">
            <img src="/logo_lg.webp" alt="logo" className="w-auto h-12" />
            <a
              href="/https://don.mo5.com/"
              className="btn block"
              target="_blank"
            >
              Soutenir
            </a>
          </header>
          <main className="p-2">{children}</main>
        </div>
      </body>
    </html>
  )
}
