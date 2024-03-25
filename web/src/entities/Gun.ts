import { Camera } from '../Camera'
import shootImage1 from '../assets/effects/flash/Flash_A_01.png'
import shootImage2 from '../assets/effects/flash/Flash_A_02.png'
import shootImage3 from '../assets/effects/flash/Flash_A_03.png'
import { loadImage } from '../utils'

type Mouse = {
  x: number,
  y: number
}

export class Gun {

  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  image!: HTMLImageElement
  mouse!: Mouse
  rotation!: number

  isShooting = false
  currentShotSprite = 0
  shotSpriteFrameRate = 5
  shotSprites!: HTMLImageElement[]

  constructor(context: CanvasRenderingContext2D, x: number, y: number, image: string) {

    this.context = context
    this.x = x
    this.y = y
    this.mouse = { x: 0, y: 0 }

    // Creating the image and getting width and height
    loadImage(image, image => {
      this.width = image.width
      this.height = image.height
      this.image = image
    })

    // Creating images of shoot sprites and adding them to the shotSprites array
    this.shotSprites = [
      shootImage1,
      shootImage1,
      shootImage1,
      shootImage1,
      shootImage1,
      shootImage2,
      shootImage2,
      shootImage2,
      shootImage2,
      shootImage2,
      shootImage3,
      shootImage3,
      shootImage3,
      shootImage3,
      shootImage3
    ].map((sprite) => loadImage(sprite))
  }

  shoot() {
    this.isShooting = true
  }

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }

  rotate(angle: number) {
    this.rotation = angle
  }

  update() {
    // Calculating current shot sprite
    if (this.isShooting) {

      this.currentShotSprite++

      if (this.currentShotSprite === this.shotSprites.length) {
        this.currentShotSprite = 0
        this.isShooting = false
      }

    }
  }

  draw(camera?: Camera) {

    const cameraX = camera ? camera.x : 0
    const cameraY = camera ? camera.y : 0

    // Drawing the current gun
    this.context.save()
    this.context.translate(this.x - cameraX, this.y - cameraY)
    this.context.rotate(this.rotation)
    this.image && this.context.drawImage(this.image, -(this.width/4), -(this.height/4), this.width/2, this.height/2)
    this.context.restore()

    // Drawing the shot
    const gunX = this.x + 80 * Math.sin(this.rotation)
    const gunY = this.y - 80 * Math.cos(this.rotation)
    
    this.context.save()
    this.context.translate(gunX - cameraX, gunY - cameraY)
    this.context.rotate(this.rotation)

    if (this.isShooting) {
      const currentShotSprite = this.shotSprites[this.currentShotSprite]
      this.context.drawImage(
        currentShotSprite, 
        -currentShotSprite.width/4, 
        -currentShotSprite.height/4,
        currentShotSprite.width/2,
        currentShotSprite.height/2,
      )
    }

    this.context.restore()
  }
}