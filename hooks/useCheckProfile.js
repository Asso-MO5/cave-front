import { useSession } from '@/components/SessionProvider'
import { checkProfiles } from '@/utils/check-profiles'

export function useCheckProfiles(path, method) {
  const session = useSession()
  if (!session) return false

  return checkProfiles(session, path, method)
}
