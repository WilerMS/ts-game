import { Camera } from "./Camera"
import { Socket } from "./Socket"
import { Enemy } from "./entities/Enemy"
import { Player } from "./entities/Player"
import { loadImage } from "./utils"

import bg from './assets/tiles/map.png'

export class Game {

  context!: CanvasRenderingContext2D
  socket!: Socket
  camera!: Camera
  background!: HTMLImageElement
  mapBoundaries!: { width: number, height: number }

  playerId!: string
  player!: Player
  enemies!: { [x: string]: Enemy }

  constructor(context: CanvasRenderingContext2D, playerId: string) {

    this.context = context
    this.mapBoundaries = { width: 7000, height: 7000}
    this.camera = new Camera(0, 0, context.canvas.width, context.canvas.height, this.mapBoundaries.width, this.mapBoundaries.height)
    this.playerId = playerId

    // TODO: Replace this logic to accept individual tank choices
    const index = Math.floor(Math.random() * 4)
    this.player = new Player(context, playerId, (context.canvas.width / 2), (context.canvas.height / 2), index, this.camera)
    this.enemies = {}

    this.background = loadImage(bg)

    this.initWebsocket()

  }

  initWebsocket() {
    this.socket = new Socket('ws://localhost:3500/game' ?? 'ws://10.200.223.237:3500/game')
    this.socket.onopen = () => {
      this.socket.send({
        type: 'start',
        data: {
          playerId: this.player.id,
          x: this.player.x,
          y: this.player.y,
          angle: this.player.angle,
          gunAngle: this.player.gun.rotation,
          imageIndex: this.player.imageIndex
        }
      })
    }

    this.player.onShot = (data) => {
      console.log({ data })
      if (this.socket.connected) {
        this.socket.send(data)
      }
    }

    this.socket.onstart = data => {
      Object.values(data).forEach((enemy) => {
        if (enemy.playerId === this.playerId) return
        this.enemies[enemy.playerId] = new Enemy(this.context, enemy.playerId, enemy.x, enemy.y, enemy.imageIndex, this.camera)
      })
    }

    this.socket.onupdate = enemy => {
      if (enemy.playerId === this.playerId) return

      if (!this.enemies[enemy.playerId]) {
        this.enemies[enemy.playerId] = new Enemy(this.context, enemy.playerId, enemy.x, enemy.y, enemy.imageIndex, this.camera)
      }

      this.enemies[enemy.playerId].driving = (this.enemies[enemy.playerId].x !== enemy.x || this.enemies[enemy.playerId].y !== enemy.y)
      this.enemies[enemy.playerId].move(enemy)
    }

    this.socket.onshot = enemy => {
      if (enemy.playerId === this.playerId) return
      this.enemies[enemy.playerId].shoot()
    }

    this.socket.ondisconnection = enemy => {
      delete this.enemies[enemy.playerId]
    }
  }

  update() {
    const enemies = Object.values(this.enemies)
    // Updating local player
    this.player.update(enemies)
    // Updating enemies with socket data
    enemies.forEach(enemy => enemy.update([...enemies, this.player]))

    // Updating camera
    this.camera.update(this.player.x, this.player.y)
    
    if (this.socket.connected) this.socket.send({
      type: 'update',
      data: {
        playerId: this.player.id,
        x: this.player.x,
        y: this.player.y,
        angle: this.player.angle,
        gunAngle: this.player.gun.rotation,
        imageIndex: this.player.imageIndex
      }
    })

  }

  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

    this.context.drawImage(this.background, -this.camera.x, -this.camera.y)

    Object.values(this.enemies).forEach(enemy => enemy.draw())
    this.player.draw()
  }

  render() {
    this.update()
    this.draw()
    requestAnimationFrame(this.render.bind(this))
  }

}