import gunImageSrc from '../assets/players/color_1/Gun_01.png'
import shootImage1 from '../assets/effects/flash/Flash_A_01.png'
import shootImage2 from '../assets/effects/flash/Flash_A_02.png'
import shootImage3 from '../assets/effects/flash/Flash_A_03.png'

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
  shotSprites!: HTMLImageElement[]

  constructor(context: CanvasRenderingContext2D, x: number, y: number) {

    this.context = context
    this.x = x
    this.y = y
    this.mouse = { x: 0, y: 0 }

    // Creating the image and getting width and height
    const gunImage = new Image()
    gunImage.src = gunImageSrc
    gunImage.onload = () => {
      this.width = gunImage.width
      this.height = gunImage.height
      this.image = gunImage
    }

    // Creating images of shoot sprites and adding them to the shotSprites array
    this.shotSprites = [
      shootImage1,
      shootImage1,
      shootImage1,
      shootImage2,
      shootImage2,
      shootImage2,
      shootImage3,
      shootImage3,
      shootImage3
    ].map((sprite) => {
      const gunImage = new Image()
      gunImage.src = sprite
      return gunImage
    })
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
      if (this.currentShotSprite < this.shotSprites.length - 1) {
        this.currentShotSprite++
      } else {
        this.currentShotSprite = 0
        this.isShooting = false
      }
    }
  }

  draw() {
    // Drawing the current gun
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.rotation)
    this.image && this.context.drawImage(this.image, -(this.width/4), -(this.height/4), this.width/2, this.height/2)
    this.context.restore()

    // Drawing the shot
    const deltaX = this.x + 80 * Math.sin(this.rotation)
    const deltaY = this.y - 80 * Math.cos(this.rotation)
    
    this.context.save()
    this.context.translate(deltaX, deltaY)
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