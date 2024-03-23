import { Controller } from "./Controller"
import { Socket } from "./Socket"
import { Enemy } from "./entities/Enemy"
import { Player } from "./entities/Player"

import backgroundImage from './assets/tiles/top-view-city-with-desert_70347-2005.avif'

export class Game {

  context!: CanvasRenderingContext2D
  controller!: Controller
  socket!: Socket

  // TODO: This may be better in its own class
  background!: HTMLImageElement
  backgroundX!: number
  backgroundY!: number

  playerId!: string
  player!: Player
  enemies!: { [x: string]: Enemy }

  constructor(context: CanvasRenderingContext2D, playerId: string) {

    this.context = context
    this.playerId = playerId

    // TODO: Replace this logic to accept individual tank choices
    const index = Math.floor(Math.random() * 4)
    this.player = new Player(context, playerId, (context.canvas.width / 2), (context.canvas.height / 2), index)
    this.enemies = {}

    const background = new Image()
    background.src = backgroundImage
    background.onload = () => {
      this.background = background
    }

    this.initController()
    this.initWebsocket()

  }

  initController() {
    this.controller = new Controller()
    this.controller.click = (x, y) => {
      this.player.shoot()
      if (this.socket.connected) {
        this.socket.send({
          type: 'shoot',
          data: {
            playerId: this.player.id,
            shotX: x,
            shotY: y,
            angle: this.player.gun.rotation,
          }
        })
      }
    }
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

    this.socket.onstart = data => {
      Object.values(data).forEach((enemy) => {
        if (enemy.playerId === this.playerId) return
        this.enemies[enemy.playerId] = new Enemy(this.context, enemy.playerId, enemy.x, enemy.y, enemy.imageIndex)
      })
    }

    this.socket.onupdate = enemy => {
      if (!this.enemies[enemy.playerId]) {
        this.enemies[enemy.playerId] = new Enemy(this.context, enemy.playerId, enemy.x, enemy.y, enemy.imageIndex)
      }
      this.enemies[enemy.playerId].move(enemy)
    }

    this.socket.onshot = enemy => {
      this.enemies[enemy.playerId].shoot()
    }

    this.socket.ondisconnection = enemy => {
      delete this.enemies[enemy.playerId]
    }
  }

  update() {
    // Updating local player
    this.player.move(this.controller.keys)
    this.player.rotate(this.controller.mouse.x, this.controller.mouse.y)
    this.player.update()

    console.log(this.player.projectiles.length)
    const enemies = Object.values(this.enemies)
    this.player.projectiles.forEach((projectile) => {
      projectile.checkColision(enemies)
    })


    enemies.forEach(enemy => enemy.update())


    if (this.socket.connected) {
      this.socket.send({
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

  }

  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

    this.player.draw()
    Object.values(this.enemies).forEach(enemy => enemy.draw())
  }

  render() {
    this.update()
    this.draw()
    requestAnimationFrame(this.render.bind(this))
  }

}