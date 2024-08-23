import { dc } from '@/utils/dynamic-classes'
import { useItem } from './Item'
import { useState } from 'react'
import { useCheckRoles } from '@/hooks/useCheckRoles'
import { ROLES } from '@/utils/constants'

export function ItemState() {
  const canChangeStatus = useCheckRoles([
    ROLES.reviewer,
    ROLES.publisher,
    ROLES.admin,
  ])
  const canPubslih = useCheckRoles([ROLES.publisher, ROLES.admin])
  const { item, update } = useItem()
  const [status, setStatus] = useState(item.status)

  const handleStatus = async (newStatus) => {
    if (status === newStatus) return
    update({ status }).catch((e) => {
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
        disabled={!canChangeStatus}
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
        disabled={!canChangeStatus}
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
        disabled={!canPubslih}
      >
        Publié
      </button>
    </div>
  )
}