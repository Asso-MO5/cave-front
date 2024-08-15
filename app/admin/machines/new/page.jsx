import { MachineForm } from '@/components/machine-form'

export default async function MachineNew() {
  return (
    <div className="">
      <h1>Créer une machine</h1>
      <div className="max-w-[500px] m-auto">
        <MachineForm />
      </div>
    </div>
  )
}
