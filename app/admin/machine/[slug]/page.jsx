import { auth } from '@/auth'
import { MachineRead } from '@/components/machine-read'
import { PageList } from '@/layouts/page-list'

export default async function MachineDetails({ params: { slug } }) {
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
    <PageList
      title={machine.name}
      actions={
        <a href={`/admin/machine/${slug}/edit`} className="btn">
          Modifier
        </a>
      }
    >
      <MachineRead machine={machine} />
    </PageList>
  )
}
