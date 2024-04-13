import { Camera } from '../Camera'
import { PlayerData } from '../Socket'
import { Collidable } from './Collidable'
import { Tank } from './Tank'

export class Enemy extends Tank {
  
  speed = 3
  maxSpeed = 5
  acceleration = 0.2
  friction = 0.06
  rotation = Math.PI / 60

  constructor(
    context: CanvasRenderingContext2D, 
    id: string, 
    x: number, 
    y: number,
    imageIndex: number,
    camera: Camera
  ) {
    super(context, id, x, y, imageIndex, camera)
  }

  move(player: PlayerData) {
    this.x = player.x
    this.y = player.y
    this.angle = player.angle
    this.gun.rotation = player.gunAngle

    const deltaX = this.x - 15 * Math.sin(this.angle)
    const deltaY = this.y + 15 * Math.cos(this.angle)
    this.gun.move(deltaX, deltaY)

    this.healthBar.move(this.x - 40, this.y - 90)
  }

  update(collidableObjects: Collidable[]): void {
    super.update(collidableObjects)

    this.healthBar.update()
  }

  draw(): void {
    super.draw()

    this.healthBar.draw(this.camera)
  }

}