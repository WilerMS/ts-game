import './style.css'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const context = canvas.getContext('2d')!

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT



function animate() {

  

  console.log('hola')

  requestAnimationFrame(animate)
}


animate()
