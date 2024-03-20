import { CANVAS_HEIGHT, CANVAS_WIDTH } from './config'

const gameCanvas = document.querySelector('#canvas') as HTMLCanvasElement
const gameContext = gameCanvas.getContext('2d')!

gameCanvas.width = CANVAS_WIDTH
gameCanvas.height = CANVAS_HEIGHT

export {
  gameCanvas,
  gameContext
}