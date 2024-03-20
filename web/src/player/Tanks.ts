import { tankImages } from "../constants/images"
import { Gun } from "./Gun"
import { Projectile } from "./Projectile"

export type TankImages = {
  tank: string,
  gun: string
}

export class Tank {

  id!: string
  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  image!: HTMLImageElement
  imageIndex!: number

  angle = 0

  gun!: Gun
  projectiles!: Projectile[]

  constructor(
    context: CanvasRenderingContext2D,
    id: string,
    x: number,
    y: number,
    imageIndex: number
  ) {
    this.id = id
    this.context = context
    this.x = x
    this.y = y
    this.projectiles = []
    this.imageIndex = imageIndex

    const deltaX = x + 65 * Math.sin(this.angle)
    const deltaY = y - 65 * Math.cos(this.angle)

    this.gun = new Gun(context, deltaX, deltaY, tankImages[imageIndex].gun)

    // Creating the image and getting width and height
    const tankImage = new Image()
    tankImage.src = tankImages[imageIndex].tank
    tankImage.onload = () => {
      this.width = tankImage.width
      this.height = tankImage.height
      this.image = tankImage
    }

  }

  shoot() {
    const deltaX = this.x - 15 * Math.sin(this.angle) + 65 * Math.sin(this.gun.rotation)
    const deltaY = this.y  + 15 * Math.cos(this.angle) - 65 * Math.cos(this.gun.rotation)

    const projectile = new Projectile(this.context, deltaX, deltaY, this.gun.rotation)
    this.projectiles.push(projectile)

    this.gun.shoot()
  }

  update() {
    this.gun.update()
    // checking projectiles positions
    this.projectiles = this.projectiles.filter(projectile => {
      projectile.update()
      return !projectile.destroyed
    })
  }

  draw() {
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.angle)
    this.image && this.context.drawImage(this.image, -50, -50, 100, 100)
    this.context.restore()

    // Drawing gun
    this.gun.draw()

    // Drawing projectiles
    for (const projectile of this.projectiles) {
      projectile.draw()
    }
  }

}