import './style.css'
import { gameCanvas, gameContext } from './canvas'
import { Game } from './Game'


const game = new Game(gameContext, `${new Date().getTime()}`)

game.render()
