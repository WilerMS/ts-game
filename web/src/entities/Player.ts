import { Camera } from '../Camera'
import { Controller, Keys } from '../Controller'
import { EmitMessage } from '../Socket'
import { Collidable } from './Collidable'
import { Tank } from './Tank'

export class Player extends Tank {
  
  canvasPosition!: { x: number, y: number }
  controller!: Controller

  speed = 3
  boostSpeed = 0
  maxSpeed = 5
  acceleration = 0.2
  friction = 0.06
  rotation = Math.PI / 60

  constructor(
    context: CanvasRenderingContext2D, 
    id: string, 
    imageIndex: number,
    camera: Camera
  ) {

    const x = Math.floor(Math.random() * camera.gameWidth) + 50 
    const y = Math.floor(Math.random() * camera.gameHeight) + 50 

    super(context, id, x, y, imageIndex, camera)

    const position = this.context.canvas.getBoundingClientRect()
    this.canvasPosition = { x: position.x, y: position.y }

    this.controller = new Controller()
    this.controller.click = (x, y) => {
      this.shoot()
      this.onShot({
        type: 'shoot',
        data: {
          playerId: this.id,
          shotX: x,
          shotY: y,
          angle: this.gun.rotation,
        }
      })
    }
  }

  onShot(data: EmitMessage) {}

  move(collidableObjects: Collidable[]) {
    const keys = this.controller.keys
    this.driving = true
    if (keys.w && !keys.s) { //* When the player is speeding the car
      this.speed += this.acceleration

      // Turn and drive the tank
      if (keys.a) this.angle -= this.rotation
      if (keys.d) this.angle += this.rotation

      // Limit max positive speed
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed

    
    } if (keys.s && !keys.w) { //* When the player is reversing the car
      this.speed -= this.acceleration

      // Turn and drive the tank
      if (keys.a) this.angle -= this.rotation
      if (keys.d) this.angle += this.rotation

      // Limit min negative speed
      if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed

    } else { //* When the player is not doing anything

      if (this.speed > 0) {
        this.speed -= this.friction
        if (this.speed < 0) this.speed = 0
      } else {
        this.speed += this.friction
        if (this.speed >= 0) this.speed = 0
      }
    }

    if (this.speed === 0) {
      this.driving = false
    }

    const proposedX = this.x + (this.speed + this.boostSpeed) * Math.sin(this.angle)
    const proposedY = this.y - (this.speed + this.boostSpeed) * Math.cos(this.angle)
    const [originalX, originalY] = [this.x, this.y]

    this.x = proposedX
    this.y = proposedY

    const isColliding = this.checkColisions(collidableObjects)

    if (isColliding) {
      this.x = originalX
      this.y = originalY
    } else {
      // moving the tank if its not in the boundaries
      if (!(this.x >= this.width / 2 && this.x <= this.camera.gameWidth - this.width / 2)) this.x = originalX
      if (!(this.y >= this.height / 2 && this.y <= this.camera.gameHeight - this.height / 2)) this.y = originalY
    }

    // Updating the gun position and angle
    const deltaX = this.x - 15 * Math.sin(this.angle)
    const deltaY = this.y + 15 * Math.cos(this.angle)
    this.gun.move(deltaX, deltaY)
  }

  checkColisions(collidableObjects: Collidable[]) {

    const intersects = (rect1: Collidable, rect2: Collidable) => (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )

    return collidableObjects.some(obj => intersects(this, obj))
  }

  boost() {
    this.boostSpeed = this.controller.keys[' '] && this.controller.keys.w ? 4 : 0
  }

  rotateGun() {
    const mouse = this.controller.mouse
    const gunX = this.x - 15 * Math.sin(this.angle)
    const gunY = this.y + 15 * Math.cos(this.angle)
    const angle = Math.atan2(mouse.x - this.canvasPosition.x - gunX + this.camera.x, -(mouse.y - this.canvasPosition.y - gunY + this.camera.y))
    this.gun.rotate(angle)
  }

  updateFlame() {
    if (this.boostSpeed === 4) {
      this.boostFlamesFrame++
      if (this.boostFlamesFrame === this.boostFlames.length) {
        this.boostFlamesFrame = 0
      }
    }
  }

  update(collidableObjects: Collidable[]): void {
    super.update(collidableObjects)

    this.move(collidableObjects)
    this.boost()
    this.rotateGun()
    this.updateFlame()


  }

  draw() {
    
    if (this.boostSpeed === 4) {
      this.context.save()
      this.context.translate(this.x - this.camera.x, this.y - this.camera.y)
      this.context.rotate(this.angle)
      
      this.context.drawImage(this.boostFlames[this.boostFlamesFrame], -100, -55, 200, 200)
      
      this.context.restore()
    }

    super.draw()
  }
}