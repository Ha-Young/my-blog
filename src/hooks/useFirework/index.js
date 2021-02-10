import { useState, useEffect, useCallback } from 'react'
import * as Dom from '../../utils/dom'
import * as Storage from '../../utils/storage'
import { Firework, random } from './Firework'
import { THEME } from '../../constants/enum'
import { useRef } from 'react'

const MOUSE_MOVE = 'mousemove'
const MOUSE_DOWN = 'mousedown'
const MOUSE_UP = 'mouseup'

export function useFirework(className, initActive) {
  const [active, setActive] = useState(initActive);

  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()

  // now we will setup our basic variables for the demo
  const body = Dom.getElement('body')
  // full screen dimensions
  const cw = window.innerWidth
  const ch = window.innerHeight
  // firework collection
  const fireworks = []
  // particle collection
  const particles = []
  // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
  const limiterTotal = 5
  // this will time the auto launches of fireworks, one launch per 80 loop ticks
  const timerTotal = 80

  let canvas
  let mx
  let my
  let mousedown = false

  function mouseMoveHandler(e) {
    console.log('mouseMove', active)
    if (!active) return;
    mx = e.clientX - canvas.offsetLeft
    my = e.clientY - canvas.offsetTop
  }

  function mouseDownHandler(e) {
    console.log('mouseDown', active)
    if (!active) return;
    mousedown = true
  }

  function mouseUpHandler(e) {
    console.log('mouseUp', active)
    if (!active) return;
    mousedown = false
  }

  const start = () => {
    const ctx = canvas.getContext('2d')

    let hue = 120
    let limiterTick = 0
    let timerTick = 0

    canvas.width = cw
    canvas.height = ch

    function loop() {
      // console.log(active)

      if (!active) {
        console.log('active fallse. stopped loop')
        return
      }

      requestAnimFrame(loop)

      const isDarkMode = Storage.getTheme(Dom.hasClassOfBody(THEME.DARK))

      hue += 0.5

      // normally, clearRect() would be used to clear the canvas
      // we want to create a trailing effect though
      // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
      ctx.globalCompositeOperation = 'destination-out'
      // decrease the alpha property to create more prominent trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, cw, ch)
      // change the composite operation back to our main mode
      // lighter creates bright highlight points as the fireworks and particles overlap each other
      ctx.globalCompositeOperation = 'lighter'

      // loop over each firework, draw it, update it
      var i = fireworks.length
      while (i--) {
        fireworks[i].draw(ctx, hue)
        fireworks[i].update(fireworks, i, hue)
      }

      // loop over each particle, draw it, update it
      var i = particles.length
      while (i--) {
        particles[i].draw(ctx)
        particles[i].update(particles, i)
      }

      // launch fireworks automatically to random coordinates, when the mouse isn't down
      if (timerTick >= timerTotal) {
        if (!mousedown) {
          // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
          fireworks.push(
            new Firework(
              cw / 2,
              ch,
              random(0, cw),
              random(0, ch / 2),
              particles,
              isDarkMode
            )
          )
          timerTick = 0
        }
      } else {
        timerTick++
      }

      // limit the rate at which fireworks get launched when mouse is down
      if (limiterTick >= limiterTotal) {
        if (mousedown) {
          // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
          fireworks.push(
            new Firework(cw / 2, ch, mx, my, particles, isDarkMode)
          )
          limiterTick = 0
        }
      } else {
        limiterTick++
      }
    }
    // once the window loads, we are ready for some fireworks!
    loop()
  }

  const stop = () => {
    // debugger
    body.removeEventListener(MOUSE_MOVE, mouseMoveHandler)
    body.removeEventListener(MOUSE_DOWN, mouseDownHandler)
    body.removeEventListener(MOUSE_UP, mouseUpHandler)
  }

  useEffect(() => {
    canvas = Dom.getElement(`.${className}`)

    // debugger
    if (active){
      body.addEventListener(MOUSE_MOVE, mouseMoveHandler)
      body.addEventListener(MOUSE_DOWN, mouseDownHandler)
      body.addEventListener(MOUSE_UP, mouseUpHandler)
      start()
    }
    else {
      stop()
    }

    return function() {
      // debugger
      stop()
    }
  }, [active])

  return [active, setActive]
}
