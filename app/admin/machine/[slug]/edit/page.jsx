import { auth } from '@/auth'
import { MachineForm } from '@/components/machine-form'

export default async function MachineEdit({ params }) {
  const { slug } = params
  const session = await auth()
  const signal = new AbortController().signal

  const machine = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/machines/' + slug,
    {
      signal,
      headers: {
        Authorization: 'Bearer ' + session.api_token,
      },
    }
  ).then((res) => res.json())

  return (
    <div className="">
      <h1>Créer une machine</h1>
      <div className="max-w-[500px] m-auto">
        <MachineForm machine={machine} />
      </div>
    </div>
  )
}
