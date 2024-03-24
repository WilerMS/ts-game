export class Camera {
  x!: number
  y!: number
  width!: number
  height!: number
  gameWidth!: number
  gameHeight!: number

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    gameWidth: number,
    gameHeight: number
  ) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
  }

  update(x: number, y: number) {
    this.x = x - this.width / 2
    this.y = y - this.height / 2

    this.x = Math.max(0, this.x)
    this.y = Math.max(0, this.y)

    this.x = Math.min(this.x, this.gameWidth - this.width)
    this.y = Math.min(this.y, this.gameHeight - this.height)
  }

}