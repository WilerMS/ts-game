import { Camera } from '../Camera'
import { PlayerData } from '../Socket'
import { Collidable } from './Collidable'
import { Projectile } from './Projectile'
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

  onDamagePlayer(data: Collidable) {}

  shoot() {
    const deltaX = this.x - 15 * Math.sin(this.angle) + 65 * Math.sin(this.gun.rotation)
    const deltaY = this.y  + 15 * Math.cos(this.angle) - 65 * Math.cos(this.gun.rotation)

    const projectile = new Projectile(this.context, deltaX - this.camera.x, deltaY - this.camera.y, this.gun.rotation, this.camera)

    projectile.onColision = enemy => this.onDamagePlayer(enemy)

    this.projectiles.push(projectile)

    this.gun.shoot()
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