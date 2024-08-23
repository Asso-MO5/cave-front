import { useSession } from '@/components/SessionProvider'

export function useCheckRoles(roles) {
  const { user } = useSession()
  if (!user) return false

  return roles.some((role) => user.roles.map((r) => r.name).includes(role))
}
