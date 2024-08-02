import { redirect } from 'next/navigation'

async function api() {
  const res = await fetch(process.env.API_URL)
  const data = await res.text()
  return data
}

export default async function Home() {
  const data = await api()

  return redirect('/login')
}
