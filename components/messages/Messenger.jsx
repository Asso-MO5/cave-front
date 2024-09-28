'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Textarea,
} from '@headlessui/react'
import { Button } from '@/ui/Button'
import { Virtuoso } from 'react-virtuoso'
import { useMsgCb } from '@/hooks/useMsg'
import { useParams, usePathname } from 'next/navigation'
import { fetcher } from '@/utils/fetcher'

export function Messenger({ session }) {
  const virtuosoRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(0)
  const pathname = usePathname()
  const params = useParams()
  const room_id = useMemo(
    () => pathname.replace(/(\/|-)/g, ''),
    [pathname, params]
  )

  console.log('room_id', room_id)

  useMsgCb(`/room/${room_id}`, (msg) => {
    setMessages((prev) => [...prev, msg])
    if (session.user.id !== msg.author_id) setCount((prev) => prev + 1)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ctrl = new AbortController()

    setMessage('')
    setCount(0)
    fetcher.post(`/messages/${room_id}`, ctrl.signal, {
      content: message,
      user: session.user,
    })
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFetch = async () => {
    if (!room_id) return
    setLoading(true)
    const ctrl = new AbortController()
    const data = await fetcher.get(`/messages/${room_id}`, ctrl.signal)
    const resJson = await data.json()
    setMessages(resJson)
    setLoading(false)
  }

  useEffect(() => {
    handleFetch()
  }, [room_id])

  // Scrolling to the bottom when new messages are received
  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="fixed bottom-0 right-0 w-52">
      <Disclosure key={room_id}>
        <DisclosureButton
          className="p-1 bg-mo-primary text-mo-white text-xs w-full"
          onClick={() => setCount(0)}
        >
          {loading ? '...' : 'Messagerie'} {count > 0 && `(${count})`}
        </DisclosureButton>
        <DisclosurePanel className="bg-mo-white p-1">
          <div className="h-96 flex flex-col gap-1 overflow-y-auto">
            <Virtuoso
              ref={virtuosoRef}
              style={{ height: '100%', width: '100%' }}
              data={messages}
              totalCount={messages.length}
              itemContent={(index) => {
                return (
                  <div className="flex flex-col gap-1 py-2 px-1">
                    <div className="flex gap-2 items-center text-xs text-mo-primary font-bold">
                      <img
                        src={messages[index].author_avatar || '/mo5.webp'}
                        alt="avatar"
                        className="w-5 h-5 rounded-full"
                      />
                      <div>{messages[index].author_name}</div>
                    </div>
                    <div className="text-sm pl-2">
                      {messages[index].content}
                    </div>
                    <div className="w-full text-right text-xs italic opacity-50">
                      {new Date(messages[index].created_at).toLocaleString()}
                    </div>
                  </div>
                )
              }}
              followOutput
            />

            <div className="flex gap-2 flex-col border-t border-black/15">
              <Textarea
                name="msg"
                className="w-full p-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="self-end">
                <Button onClick={handleSubmit}>Envoyer</Button>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}
