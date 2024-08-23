import { EventEmitter } from 'events'

let eventEmitter = null
const subscribers = {}

if (typeof window !== 'undefined' && !eventEmitter)
  eventEmitter = new EventEmitter()

export const subscribe = (event, callback) => {
  if (!subscribers[event]) subscribers[event] = []

  subscribers[event].push(callback)
}

export const unsubscribe = (event, callback) => {
  if (!subscribers[event]) return
  subscribers[event] = subscribers[event].filter((cb) => cb !== callback)
}

export const publish = (event, data) => {
  if (!subscribers[event]) return
  subscribers[event].forEach((callback) => callback(data))
}

export { eventEmitter }
