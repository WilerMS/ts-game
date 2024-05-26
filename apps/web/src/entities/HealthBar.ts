import { Camera } from "../Camera"

export class HealthBar {

  context!: CanvasRenderingContext2D
  x!: number
  y!: number
  width = 100
  height = 25

  currentHealth = 50

  constructor(context: CanvasRenderingContext2D, x: number, y: number) {
    this.context = context
    this.x = x
    this.y = y
  }

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }

  changeCurrentHealth(value: number) {
    this.currentHealth = value
  }

  update() {

  }

  draw(camera?: Camera) {

    const cameraX = camera?.x ?? 0
    const cameraY = camera?.y ?? 0

    this.context.save()
    this.context.translate(this.x - cameraX, this.y - cameraY)

    this.context.strokeStyle = '#000000'
    this.context.strokeRect(0, 0, this.width, this.height)

    const healthWidth = (this.currentHealth / 100) * this.width

    this.context.fillStyle = '#00FF00'
    this.context.fillRect(0, 0, healthWidth, this.height)

    this.context.restore()
  }

}