import './style.css'
import tankImageSrc from './assets/PNG/Weapon_Color_D/Gun_08.png'
import { gameCanvas, gameContext } from './canvas'

let FRAME = 0

const mouse = { x: 0, y: 0 }
const keyPress = {
  w: false,
  s: false,
  d: false,
  a: false
}

document.addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

document.addEventListener('keydown', event => {
  const currentKey = event.key.toLowerCase() as keyof typeof keyPress
  // If theres no control keys pressed, then finish
  if (!Object.keys(keyPress).includes(currentKey)) return
  keyPress[currentKey] = true
})

document.addEventListener('keyup', event => {
  const currentKey = event.key.toLowerCase() as keyof typeof keyPress
  // If theres no control keys pressed, then finish
  if (!Object.keys(keyPress).includes(currentKey)) return
  keyPress[currentKey] = false
})


const tankImage = new Image()
tankImage.onload = () => { }
tankImage.src = tankImageSrc

let rotation = 0
let tankWidth = 200
let tankHeight = 200
let tankX = (gameCanvas.width / 2) - (tankWidth / 2)
let tankY = (gameCanvas.height / 2) - (tankHeight / 2)
let tankVelocity = 3


function update() {

  if (keyPress.w) tankY -= tankVelocity
  if (keyPress.s) tankY += tankVelocity
  if (keyPress.a) tankX -= tankVelocity
  if (keyPress.d) tankX += tankVelocity


  rotation = Math.atan2(mouse.x - tankX, -(mouse.y - tankY))
  
}

function draw() {
  gameContext.save()
  gameContext.translate(tankX, tankY)
  gameContext.fillStyle = 'red'
  gameContext.fillRect(-tankWidth/2, -tankHeight / 2, tankWidth, tankHeight)
  gameContext.rotate(rotation)


  gameContext.drawImage(
    tankImage,
    -tankImage.width / 2,
    -tankImage.height / 2,
  )

  gameContext.restore()

}


function animate() {
  if (FRAME % 1 === 0) {
    update()

    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)

    draw()
  }
  
  FRAME++
  requestAnimationFrame(animate)
}


animate()
