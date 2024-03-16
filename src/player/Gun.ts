import gunImageSrc from '../assets/players/color_1/Gun_01.png'

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

    // Events to listend mouse
    document.addEventListener('mousemove', event => {
      this.mouse.x = event.clientX
      this.mouse.y = event.clientY
    })

  }

  update(x: number, y: number) {
    this.x = x
    this.y = y
    this.rotation = Math.atan2(this.mouse.x - x, -(this.mouse.y - y))
  }

  draw() {
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.rotation)
    this.image && this.context.drawImage(this.image, -(this.width/4), -(this.height/4), this.width/2, this.height/2)
    this.context.restore()
  }

}