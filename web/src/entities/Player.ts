import { Keys } from '../Controller'
import { Tank } from './Tank'

export class Player extends Tank {
  
  canvasPosition!: { x: number, y: number }

  speed = 3
  boostSpeed = 0
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
    this.driving = true
    if (keys.w && !keys.s) { //* When the player is speeding the car
      this.speed += this.acceleration

      // Turn and drive the tank
      if (keys.a) this.angle -= this.rotation
      if (keys.d) this.angle += this.rotation

      // Limit max positive speed
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed

    
    } if (keys.s && !keys.w) { //* When the player is reversing the car
      this.speed -= this.acceleration

      // Turn and drive the tank
      if (keys.a) this.angle -= this.rotation
      if (keys.d) this.angle += this.rotation

      // Limit min negative speed
      if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed

    } else { //* When the player is not doing anything

      if (this.speed > 0) {
        this.speed -= this.friction
        if (this.speed < 0) this.speed = 0
      } else {
        this.speed += this.friction
        if (this.speed >= 0) this.speed = 0
      }
    }

    if (this.speed === 0) {
      this.driving = false
    }

    // moving the tank
    this.x += (this.speed + this.boostSpeed) * Math.sin(this.angle)
    this.y -= (this.speed + this.boostSpeed) * Math.cos(this.angle)

    // Updating the gun position and angle
    const deltaX = this.x - 15 * Math.sin(this.angle)
    const deltaY = this.y + 15 * Math.cos(this.angle)
    this.gun.move(deltaX, deltaY)
  }

  boost(key: boolean) {
    this.boostSpeed = key ? 4 : 0
  }

  rotate(x: number, y: number) {
    const deltaX = (this.x) - 15 * Math.sin(this.angle)
    const deltaY = this.y + 15 * Math.cos(this.angle)
    const angle = Math.atan2(x - this.canvasPosition.x - deltaX, -(y - this.canvasPosition.y - deltaY))
    this.gun.rotate(angle)
  }

}