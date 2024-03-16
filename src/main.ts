import './style.css'
import { gameCanvas, gameContext } from './canvas'
import { Player } from './player/Player'

const tank = new Player(gameContext, (gameCanvas.width / 2), (gameCanvas.height / 2))

function animate() {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  tank.render()

  requestAnimationFrame(animate)
}

animate()
