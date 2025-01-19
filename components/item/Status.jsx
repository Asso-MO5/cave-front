import { useState } from 'react'
import { useCheckRoles } from '@/hooks/useCheckRoles'

/**
 *
 * @param { props } props
 * @param { string[] } props.rolesCanEdit - Roles that can edit the item
 * @returns
 */
export function Status({ rolesCanEdit, item, update }) {
  const canPublish = useCheckRoles(rolesCanEdit)
  const [status, setStatus] = useState(item.status)

  const handleStatus = async (newStatus) => {
    if (status === newStatus) return
    const oldStatus = status
    setStatus(newStatus)
    try {
      await update(newStatus)
    } catch (e) {
      console.error(e)
      setStatus(oldStatus)
    }
  }

  return (
    <div className="flex text-xs">
      <button
        onClick={() => handleStatus('draft')}
        data-status={status}
        className="rounded-s whitespace-nowrap border border-mo-primary p-1 text-mo-primary cursor-pointer disabled:cursor-not-allowed data-[status=draft]:bg-mo-primary data-[status=draft]:text-mo-white data-[status=draft]:cursor-not-allowed disabled:opacity-100"
        disabled={!canPublish}
      >
        Brouillon
      </button>
      <button
        onClick={() => handleStatus('review')}
        data-status={status}
        className="border-y whitespace-nowrap border-mo-warning p-1 text-mo-warning  cursor-pointer disabled:cursor-not-allowed data-[status=review]:bg-mo-warning data-[status=review]:text-mo-white data-[status=review]:cursor-not-allowed disabled:opacity-100"
        disabled={!canPublish}
      >
        En relecture
      </button>
      <button
        onClick={() => handleStatus('published')}
        data-status={status}
        className="rounded-e border whitespace-nowrap border-mo-valid p-1 text-mo-valid  cursor-pointer disabled:cursor-not-allowed data-[status=published]:bg-mo-valid data-[status=published]:text-mo-white data-[status=published]:cursor-not-allowed disabled:opacity-100"
        disabled={!canPublish}
      >
        Validé
      </button>
    </div>
  )
}
