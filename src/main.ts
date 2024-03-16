import './style.css'
import { gameCanvas, gameContext } from './canvas'
import { Tank } from './player/Tank'

let tankX = (gameCanvas.width / 2)
let tankY = (gameCanvas.height / 2)

const tank = new Tank(gameContext, tankX, tankY)


function animate() {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  tank.render()

  requestAnimationFrame(animate)
}

animate()
