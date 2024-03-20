import { Keys } from '../Controller'
import tankImageSrc from '../assets/players/color_1/tank_1.png'
import { Gun } from './Gun'
import { Projectile } from './Projectile'

export class Player {

  id!: string
  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  image!: HTMLImageElement
  
  speed = 3
  maxSpeed = 5
  acceleration = 0.2
  friction = 0.06
  rotation = Math.PI / 60
  angle = 0

  // Tank features
  gun!: Gun
  projectiles!: Projectile[]

  constructor(context: CanvasRenderingContext2D, id: string, x: number, y: number) {

    this.id = id
    this.context = context
    this.x = x
    this.y = y
    this.projectiles = []

    const deltaX = x + 65 * Math.sin(this.angle)
    const deltaY = y - 65 * Math.cos(this.angle)

    this.gun = new Gun(context, deltaX, deltaY)

    // Creating the image and getting width and height
    const tankImage = new Image()
    tankImage.src = tankImageSrc
    tankImage.onload = () => {
      this.width = tankImage.width
      this.height = tankImage.height
      this.image = tankImage
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
    this.gun.update(deltaX, deltaY)
  }

  rotateGun(x: number, y: number) {
    this.gun.mouse.x = x
    this.gun.mouse.y = y
  }

  shoot() {
    const deltaX = this.x - 15 * Math.sin(this.angle) + 65 * Math.sin(this.gun.rotation)
    const deltaY = this.y  + 15 * Math.cos(this.angle) - 65 * Math.cos(this.gun.rotation)

    const projectile = new Projectile(this.context, deltaX, deltaY, this.gun.rotation)
    this.projectiles.push(projectile)

    this.gun.shoot()
  }

  update() {
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

  render() {
    this.update()
    this.draw()
  }

}