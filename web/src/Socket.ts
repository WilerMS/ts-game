export interface PlayerData {
  playerId: string
  x: number
  y: number
  angle: number
  gunAngle: number
  imageIndex: number
  // health: number
}

export interface ShotData {
  playerId: string
  shotX: number
  shotY: number
  angle: number
}

type EventMessage = 
  { type: 'update', data: PlayerData } |
  { type: 'shoot',  data: ShotData } |
  { type: 'start',  data: { [x: string]: PlayerData } } |
  { type: 'disconnection',  data: Pick<PlayerData, 'playerId'> }

export type EmitMessage =
  { type: 'start' | 'update',  data: PlayerData } |
  { type: 'shoot',  data: ShotData }



export class Socket {

  socket!: WebSocket
  connected!: boolean

  constructor(url: string) {

    this.socket = new WebSocket(url)

    this.socket.onopen = (event) => {
      this.connected = true
      console.log("WebSocket connection established.", event)
      this.onopen()
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.processEvent(message)
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    this.socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason)
    }

  }

  async send(message: EmitMessage) {
    this.socket.send(JSON.stringify(message))
  }

  processEvent(message: EventMessage) {
    switch (message.type) {
      case "start":
          this.onstart(message.data)
      break
      case "update":
        this.onupdate(message.data)
        break
      case "shoot":
        this.onshot(message.data)
      break
      case "disconnection":
        this.ondisconnection(message.data)
      break
      default:
        console.error("Unhandled message type")
    }
  }

  onopen() {}
  onupdate(data: PlayerData) {}
  onstart(data: { [x: string]: PlayerData }) {}
  onshot(data: ShotData) {}
  ondisconnection(data: Pick<PlayerData, 'playerId'>) {}

}