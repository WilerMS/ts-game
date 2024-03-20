import { Controller } from "./Controller";
import { Player } from "./player/Player";

export class Game {

  context!: CanvasRenderingContext2D
  players!: { [x: string]: Player }
  playerId!: string
  controller!: Controller

  constructor(context: CanvasRenderingContext2D, playerId: string) {

    this.context = context

    this.playerId = playerId
    this.players = {
      [playerId]: new Player(context, playerId, (context.canvas.width / 2), (context.canvas.height / 2))
    }

    this.initController()

  }

  initController() {
    this.controller = new Controller()

    this.controller.click = (x, y) => {
      this.players[this.playerId].shoot()
    }
  }

  update() {
    // Updating local player
    this.players[this.playerId].move(this.controller.keys)
    this.players[this.playerId].rotateGun(this.controller.mouse.x, this.controller.mouse.y)
    this.players[this.playerId].update()
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