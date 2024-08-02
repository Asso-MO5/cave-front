import '../globals.css'
import { Avatar } from '@/components/avatar'
import { fjallaOne, openSans } from '@/utils/fonts'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Cave MO5',
  description: 'Appi de gestion',
}

export default async function AdminLayout({ children }) {
  // ====== HOOKS ========================================
  const session = await getServerSession(authOptions)

  // ====== RENDERS ========================================
  if (!session?.user) redirect('/login')

  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        <div className="h-full grid grid-rows-[auto_1fr]">
          <header className="flex gap-2 justify-between items-center p-1 bg-mo-primary">
            <div className="flex items-center gap-2">
              <img src="/mo5.webp" alt="logo" width={32} height={32} />
              <div className="text-white font-secondary">Cave MO5</div>
            </div>
            <Avatar
              src={session.user.image}
              alt="avatar"
              size={24}
              nickname={session.user.name}
            />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
