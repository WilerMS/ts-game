
export type Keys = {
  w: boolean,
  s: boolean,
  d: boolean,
  a: boolean,
  ' ': boolean
}

export type Mouse = {
  x: number,
  y: number
}

export class Controller {

  keys!: Keys
  mouse!: Mouse

  constructor() {

    this.keys = { w: false, s: false, d: false, a: false, ' ': false }
    this.mouse = { x: 0, y: 0 }

    document.addEventListener('keydown', event => {
      const currentKey = event.key.toLowerCase() as keyof Keys
      // If theres no control keys pressed, then finish
      if (!Object.keys(this.keys).includes(currentKey)) return
      this.keys[currentKey] = true

      // Emit keyboard method
      this.keyboard(this.keys)
    })

    document.addEventListener('keyup', event => {
      const currentKey = event.key.toLowerCase() as keyof Keys
      // If theres no control keys pressed, then finish
      if (!Object.keys(this.keys).includes(currentKey)) return
      this.keys[currentKey] = false

      // Emit keyboard method
      this.keyboard(this.keys)
    })

    document.addEventListener('mousemove', event => {
      this.mouse.x = event.clientX
      this.mouse.y = event.clientY
      // this.mousemove(event.clientX, event.clientY)
    })

    document.addEventListener('click', (event) => {
      this.click(event.clientX, event.clientY)
    })

  }

  keyboard(keys: Keys) {}
  mousemove(x: number, y: number) {}
  click(x: number, y: number) {}

}