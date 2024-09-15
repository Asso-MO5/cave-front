import { dc } from '@/utils/dynamic-classes'
import { useState } from 'react'
import { useCheckProfiles } from '@/hooks/useCheckProfile'

/**
 *
 * @param { props } props
 * @param { string[] } props.rolesCanEdit - Roles that can edit the item
 * @returns
 */
export function ItemStatus({ rolesCanEdit, item, update }) {
  const canPublish = useCheckProfiles(rolesCanEdit, 'put')
  const [status, setStatus] = useState(item.status)

  const handleStatus = async (newStatus) => {
    if (status === newStatus) return
    update({ status: newStatus }).catch((e) => {
      console.error(e)
      setStatus(item.status)
    })
    setStatus(newStatus)
  }

  return (
    <div className="flex text-xs">
      <button
        onClick={() => handleStatus('draft')}
        className={dc('rounded-s border border-mo-primary p-1 ', [
          status === 'draft',
          'bg-mo-primary text-mo-white disabled:opacity-100 cursor-not-allowed',
          'text-mo-primary cursor-pointer disabled:cursor-not-allowed',
        ])}
        disabled={!canPublish}
      >
        Brouillon
      </button>
      <button
        onClick={() => handleStatus('review')}
        className={dc('border-y border-mo-warning p-1', [
          status === 'review',
          'bg-mo-warning text-mo-white disabled:opacity-100 cursor-not-allowed',
          'text-mo-warning  cursor-pointer disabled:cursor-not-allowed',
        ])}
        disabled={!canPublish}
      >
        En relecture
      </button>
      <button
        onClick={() => handleStatus('published')}
        className={dc('rounded-e border border-mo-valid p-1', [
          status === 'published',
          'bg-mo-valid text-mo-white disabled:opacity-100 cursor-not-allowed',
          'text-mo-valid  cursor-pointer disabled:cursor-not-allowed',
        ])}
        disabled={!canPublish}
      >
        Publié
      </button>
    </div>
  )
}
