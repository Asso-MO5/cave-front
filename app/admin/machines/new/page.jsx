import { auth } from '@/auth'
import { MachineForm } from '@/components/machine-form'

export default async function MachineNew() {
  const session = await auth()
  return (
    <div className="">
      <h1>Créer une machine</h1>
      <MachineForm session={session} />
    </div>
  )
}
