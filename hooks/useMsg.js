'use-client'
import { Message } from '@/utils/message'
import { useEffect, useState } from 'react'

export function useMsg(room = '/public') {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    Message.getClient().subscribe(room, (msg) => {
      setMsg(msg)
    })
  })
  return {
    msg,
  }
}

export function useMsgCb(room = '/public', cb) {
  useEffect(() => {
    Message.getClient().subscribe(room, cb)
    return () => Message.getClient().unsubscribe(room)
  }, [room])
}
