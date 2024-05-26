import { Camera } from '../Camera'
import projectileImageSrc from '../assets/effects/shell.png'
import { loadImage } from '../utils'
import { Collidable } from './Collidable'
import { Enemy } from './Enemy'

export class Projectile {

  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  angle!: number
  image!: HTMLImageElement
  destroyed!: boolean
  camera!: Camera

  speed = 20

  constructor(
    context: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    angle: number, 
    camera: Camera
  ) {

    this.context = context
    this.x = x
    this.y = y
    this.angle = angle
    this.destroyed = false
    this.width = 20
    this.height = 36
    this.camera = camera

    // Creating the image and getting width and height
    loadImage(projectileImageSrc, image => this.image = image)
  }

  onColision(enemy: Collidable) {}

  checkColision(collidableObjects: Collidable[]) {

    if (this.x > this.context.canvas.width || this.x < 0) this.destroy()
    if (this.y > this.context.canvas.height || this.y < 0) this.destroy()

    for (const enemy of collidableObjects) {

      const checkX = this.x <= (enemy.x - this.camera.x + enemy.width / 2) && this.x >= (enemy.x - this.camera.x - enemy.width / 2)
      const checkY = this.y <= (enemy.y - this.camera.y + enemy.height / 2) && this.y >= (enemy.y - this.camera.y - enemy.height / 2)

      if (checkX && checkY) {
        this.onColision(enemy)
        this.destroy()
      }
    }
  }

  update(collidableObjects: Collidable[]) {
    this.x += this.speed * Math.sin(this.angle)
    this.y -= this.speed * Math.cos(this.angle)

    this.checkColision(collidableObjects)
  }

  draw() {

    //if (this.destroyed) return
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.angle)
    
    this.image && this.context.drawImage(this.image, -2*13, -2.5*13, 4*13, 5*13)
    this.context.restore()
  }

  destroy() {
    this.destroyed = true
  }

}