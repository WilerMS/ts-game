import { Controller } from "./Controller";
import { Socket } from "./Socket";
import { Player } from "./player/Player";

export class Game {

  context!: CanvasRenderingContext2D
  players!: { [x: string]: Player }
  playerId!: string
  controller!: Controller
  socket!: Socket

  constructor(context: CanvasRenderingContext2D, playerId: string) {

    this.context = context

    this.playerId = playerId
    this.players = {
      [playerId]: new Player(context, playerId, (context.canvas.width / 2), (context.canvas.height / 2))
    }

    this.initController()
    this.initWebsocket()

  }

  initController() {
    this.controller = new Controller()
    this.controller.click = (x, y) => {
      this.players[this.playerId].shoot()
      if (this.socket.connected) {
        this.socket.send({
          type: 'shoot',
          data: {
            playerId: this.players[this.playerId].id,
            shotX: x,
            shotY: y,
            angle: this.players[this.playerId].gun.rotation,
          }
        })
      }
    }
  }

  initWebsocket() {

    this.socket = new Socket('ws://localhost:3000/game')
    this.socket.onopen = () => {
      this.socket.send({
        type: 'start',
        data: {
          playerId: this.players[this.playerId].id,
          x: this.players[this.playerId].x,
          y: this.players[this.playerId].y,
          angle: this.players[this.playerId].angle,
          gunAngle: this.players[this.playerId].gun.rotation,
        }
      })
    }

    this.socket.onstart = (data) => {
      Object.values(data).forEach((player) => {
        if (player.playerId === this.playerId) return
        this.players[player.playerId] = new Player(this.context, player.playerId, player.x, player.y)
      })
    }

    this.socket.onupdate = (data) => {
      if (!this.players[data.playerId]) {
        this.players[data.playerId] = new Player(this.context, data.playerId, data.x, data.y)
      }

      this.players[data.playerId].moveRemotePlayer(data)
    }

    this.socket.onshot = (data) => {
      this.players[data.playerId].shoot()
    }

    this.socket.ondisconnection = (data) => {
      console.log(data)
      delete this.players[data.playerId]
    }
  }

  update() {
    // Updating local player
    this.players[this.playerId].moveLocalPlayer(this.controller.keys)
    this.players[this.playerId].rotateLocalPlayerGun(this.controller.mouse.x, this.controller.mouse.y)

    Object.values(this.players).forEach(player => {
      player.update()
    })

    if (this.socket.connected) {
      this.socket.send({
        type: 'update',
        data: {
          playerId: this.players[this.playerId].id,
          x: this.players[this.playerId].x,
          y: this.players[this.playerId].y,
          angle: this.players[this.playerId].angle,
          gunAngle: this.players[this.playerId].gun.rotation
        }
      })
    }

  }

  draw() {

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

    Object.values(this.players).forEach(player => {
      player.draw()
    })

  }

  render() {

    this.update()
    this.draw()

    requestAnimationFrame(this.render.bind(this))
  }

}