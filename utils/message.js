'use-client'
import Nes from '@hapi/nes/lib/client'

const URL =
  process.env.NODE_ENV === 'development'
    ? `ws://${process.env.NEXT_PUBLIC_API_URL.split('//')[1]}`
    : `wss://${process.env.NEXT_PUBLIC_API_URL.split('//')[1]}`

class WebSocketSingleton {
  constructor() {
    if (!WebSocketSingleton.instance) {
      this.client = new Nes.Client(URL, { reconnect: true, maxDelay: 1000 })
      WebSocketSingleton.instance = this
    }

    return WebSocketSingleton.instance
  }

  async connect() {
    return this.client.connect().then(() => {
      console.log('Connected to WebSocket')
    })
  }

  getClient() {
    return this.client
  }
}

const instance = new WebSocketSingleton()
Object.freeze(instance)

instance.connect()
export const Message = instance
