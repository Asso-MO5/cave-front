'use client'
import { useState } from 'react'
import { EditIcon } from './icon/EditIcon'
import { dc } from '@/utils/dynamic-classes'

export function ReadAndEdit({ read, edit }) {
  const [isEditing, setIsEditing] = useState(false)

  const handleToggle = () => {
    setIsEditing(!isEditing)
  }
  return (
    <div
      className={dc(
        'transition-colors border border-dashed border-transparent',
        'hover:border-black/10 relative group z-20 p-4',
        [isEditing, 'border-black/10']
      )}
    >
      {!isEditing && (
        <div
          className={dc(
            'absolute top-[2px] right-[2px] transition-opacity opacity-0 z-50',
            'group-hover:opacity-100 p-1 w-5 h-5 rounded-full',
            'bg-mo-primary flex items-center justify-center'
          )}
          onClick={handleToggle}
        >
          <EditIcon className="fill-mo-white h-4 cursor-pointer" />
        </div>
      )}
      {isEditing ? edit(handleToggle) : read(handleToggle)}
    </div>
  )
}
