import 'react-toastify/dist/ReactToastify.css'
import '@blocknote/mantine/style.css'
import '../globals.css'
import { fjallaOne, openSans } from '@/utils/fonts'
import { PublicLayout } from '@/components/PublicLayout'

export const metadata = {
  title: 'Cave MO5',
  description: 'Fiche MO5',
}

export const runtime = 'edge'

export default async function FicheLayout({ children }) {
  return <PublicLayout>{children}</PublicLayout>
}
