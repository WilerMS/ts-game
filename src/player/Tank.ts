import tankImageSrc from '../assets/players/color_1/tank_1.png'
import { Gun } from './Gun'

type Keys = {
  w: boolean,
  s: boolean,
  d: boolean,
  a: boolean
}

export class Tank {

  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width!: number
  height!: number
  keys!: Keys
  image!: HTMLImageElement
  
  speed = 3
  maxSpeed = 5
  acceleration = 0.2
  friction = 0.06
  rotation = Math.PI / 60
  angle = 0

  // Tank features
  gun!: Gun

  constructor(context: CanvasRenderingContext2D, x: number, y: number) {

    this.context = context
    this.x = x
    this.y = y
    this.keys = {
      w: false,
      s: false,
      d: false,
      a: false
    }
    this.gun = new Gun(context, x, y)

    // Creating the image and getting width and height
    const tankImage = new Image()
    tankImage.src = tankImageSrc
    tankImage.onload = () => {
      this.width = tankImage.width
      this.height = tankImage.height
      this.image = tankImage
    }

    // Events to listend keyboard
    document.addEventListener('keydown', event => {
      const currentKey = event.key.toLowerCase() as keyof Keys
      // If theres no control keys pressed, then finish
      if (!Object.keys(this.keys).includes(currentKey)) return
      this.keys[currentKey] = true
    })
    
    document.addEventListener('keyup', event => {
      const currentKey = event.key.toLowerCase() as keyof Keys
      // If theres no control keys pressed, then finish
      if (!Object.keys(this.keys).includes(currentKey)) return
      this.keys[currentKey] = false
    })

  }


  update() {

    // Accelerate and curb
    if (this.keys.w) {
      this.speed += this.acceleration

      // Turn and drive the tank
      if (this.keys.a) this.angle -= this.rotation
      if (this.keys.d) this.angle += this.rotation
    } else {
      this.speed -= this.friction
    }

    // Limit max speed and negative speed
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed
    else if (this.speed < 0) this.speed = 0

    // moving the tank
    this.x += this.speed * Math.sin(this.angle)
    this.y -= this.speed * Math.cos(this.angle)

  }

  draw() {

    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.angle)

    this.image && this.context.drawImage(this.image, -50, -50, 100, 100)

    this.context.restore()
  }

  render() {
    this.update()
    this.gun.update(this.x, this.y)
    this.draw()
    this.gun.draw()
  }

}