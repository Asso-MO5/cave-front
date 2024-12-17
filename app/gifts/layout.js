import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'

import { PublicLayout } from '@/components/PublicLayout'

export const metadata = {
  title: 'Cave MO5',
  description: 'Fiche MO5',
}

export const runtime = 'edge'

export default async function Layout({ children }) {
  return <PublicLayout>{children}</PublicLayout>
}
