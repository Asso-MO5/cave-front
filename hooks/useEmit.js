'use client'
import { eventEmitter } from '@/utils/event-emitter'
import { useEffect } from 'react'

export function useEmit() {
  const emit = (room, msg) => {
    eventEmitter.emit(room, msg)
  }

  return {
    emit,
  }
}

export function useSub(room, callback) {
  useEffect(() => {
    eventEmitter.on(room, callback)

    return () => {
      eventEmitter.off(room, callback)
    }
  }, [room, callback])

  return null
}
