import projectileImageSrc from '../assets/effects/shell.png'


export class Projectile {

  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  angle!: number
  image!: HTMLImageElement
  destroyed!: boolean

  speed = 20

  constructor(
    context: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    angle: number
  ) {

    this.context = context
    this.x = x
    this.y = y
    this.angle = angle
    this.destroyed = false

    // Creating the image and getting width and height
    const projectileImage = new Image()
    projectileImage.src = projectileImageSrc
    projectileImage.onload = () => {
      this.width = projectileImage.width
      this.height = projectileImage.height
      this.image = projectileImage
    }

  }

  update() {
    this.x += this.speed * Math.sin(this.angle)
    this.y -= this.speed * Math.cos(this.angle)

    if (this.x > this.context.canvas.width || this.x < 0) this.destroy()
    if (this.y > this.context.canvas.height || this.y < 0) this.destroy()
  }

  draw() {
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.angle)
    this.image && this.context.drawImage(this.image, -(this.width/4), -(this.height/4), this.width/2, this.height/2)

    this.context.restore()
  }

  destroy() {
    this.destroyed = true
  }

}