import './style.css'
import { gameCanvas, gameContext } from './canvas'
import { Tank } from './player/Tank'

const tank = new Tank(gameContext, (gameCanvas.width / 2), (gameCanvas.height / 2))

function animate() {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  tank.render()

  requestAnimationFrame(animate)
}

animate()
