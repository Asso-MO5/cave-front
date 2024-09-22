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
          <header className=" text-white"></header>
          <main className="p-2">{children}</main>
        </div>
      </body>
    </html>
  )
}
