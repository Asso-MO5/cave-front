import './globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
  title: 'Cave MO5',
  description: 'Appli de gestion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${fjallaOne.variable}`}>
        <NextTopLoader
          color="#4088cf"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl
          showSpinner
          easing="ease"
          shadow={false}
          speed={200}
        />
        {children}
      </body>
    </html>
  )
}
