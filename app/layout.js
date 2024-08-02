import './globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'

export const metadata = {
  title: 'Cave MO5',
  description: 'Appi de gestion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        {children}
      </body>
    </html>
  )
}
