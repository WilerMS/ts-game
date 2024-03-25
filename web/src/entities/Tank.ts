import { boostImages, tankImages, trackImages } from "../constants/images"
import { loadImage } from "../utils"
import { Collidable } from "./Collidable"
import { Gun } from "./Gun"
import { Projectile } from "./Projectile"
import { Camera } from "../Camera"

export type TankImages = {
  tank: string,
  gun: string
}


export class Tank implements Collidable {

  id!: string
  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  image!: HTMLImageElement
  imageIndex!: number
  driving!: boolean

  angle = 0

  gun!: Gun
  tracks: HTMLImageElement[] = []
  trackFrame: number = 0

  boostFlames: HTMLImageElement[] = []
  boostFlamesFrame: number = 0

  projectiles!: Projectile[]

  // TODO: See if theres another way to do this
  camera!: Camera


  constructor(
    context: CanvasRenderingContext2D,
    id: string,
    x: number,
    y: number,
    imageIndex: number,
    camera: Camera
  ) {
    this.id = id
    this.context = context
    this.camera = camera

    this.x = x
    this.y = y
    this.imageIndex = imageIndex

    this.projectiles = []
    this.width = 70
    this.height = 96

    const gunX = x + 65 * Math.sin(this.angle)
    const gunY = y - 65 * Math.cos(this.angle)

    this.gun = new Gun(context, gunX, gunY, tankImages[imageIndex].gun)
    this.tracks = trackImages.map(image => loadImage(image))
    this.boostFlames = boostImages.map(image => loadImage(image))

    // Creating the image and getting width and height
    loadImage(tankImages[imageIndex].tank, image => this.image = image)
  }

  shoot() {
    const deltaX = this.x - 15 * Math.sin(this.angle) + 65 * Math.sin(this.gun.rotation)
    const deltaY = this.y  + 15 * Math.cos(this.angle) - 65 * Math.cos(this.gun.rotation)

    const projectile = new Projectile(this.context, deltaX - this.camera.x, deltaY - this.camera.y, this.gun.rotation)
    this.projectiles.push(projectile)

    this.gun.shoot()
  }

  updateTracks() {
    if (this.driving) {
      console.log(this.trackFrame)
      this.trackFrame++
      if (this.trackFrame === this.tracks.length) {
        this.trackFrame = 0
      }
    }
  }

  update(gameCollidableObjects: Collidable[]) {
    this.gun.update()
    this.updateTracks()

    // checking projectiles positions
    this.projectiles = this.projectiles
      .filter(projectile => {
        projectile.update(gameCollidableObjects)
        return !projectile.destroyed
      })
  }

  draw() {

    // Drawing tank
    this.context.save()
    this.context.translate(this.x - this.camera.x, this.y - this.camera.y)
    this.context.rotate(this.angle)
    this.tracks[0] && this.context.drawImage(this.tracks[this.trackFrame], -40, -50, 20, 105)
    this.tracks[0] && this.context.drawImage(this.tracks[this.trackFrame], 20, -50, 20, 105)
    this.image && this.context.drawImage(this.image, -50, -50, 100, 100)
    this.context.restore()

    // Drawing gun
    this.gun.draw(this.camera)

    // Drawing projectiles
    for (const projectile of this.projectiles) {
      // if (projectile.destroyed) continue
      projectile.draw()
    }
  }

}