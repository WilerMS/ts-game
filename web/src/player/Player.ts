import { Keys } from '../Controller'
import { Tank } from './Tanks'

export class Player extends Tank {
  
  canvasPosition!: { x: number, y: number }

  speed = 3
  maxSpeed = 5
  acceleration = 0.2
  friction = 0.06
  rotation = Math.PI / 60

  constructor(
    context: CanvasRenderingContext2D, 
    id: string, 
    x: number, 
    y: number,
    imageIndex: number
  ) {
    super(context, id, x, y, imageIndex)
    const position = this.context.canvas.getBoundingClientRect()
    this.canvasPosition = {
      x: position.x,
      y: position.y
    }
  }

  move(keys: Keys) {
    // Accelerate and curb
    if (keys.w) {
      this.speed += this.acceleration

      // Turn and drive the tank
      if (keys.a) this.angle -= this.rotation
      if (keys.d) this.angle += this.rotation
    } else {
      this.speed -= this.friction
    }

    // Limit max speed and negative speed
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed
    else if (this.speed < 0) this.speed = 0

    // moving the tank
    this.x += this.speed * Math.sin(this.angle)
    this.y -= this.speed * Math.cos(this.angle)

    // Updating the gun position and angle
    const deltaX = this.x - 15 * Math.sin(this.angle)
    const deltaY = this.y + 15 * Math.cos(this.angle)
    this.gun.move(deltaX, deltaY)
  }

  rotate(x: number, y: number) {
    const deltaX = (this.x) - 15 * Math.sin(this.angle)
    const deltaY = this.y + 15 * Math.cos(this.angle)
    const angle = Math.atan2(x - this.canvasPosition.x - deltaX, -(y - this.canvasPosition.y - deltaY))
    this.gun.rotate(angle)
  }

}