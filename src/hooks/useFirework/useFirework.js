import { useEffect, useCallback } from 'react'
import * as Dom from '../../utils/dom'
import { Firework, random } from './Firework'

export function useFirework(className) {
  const init = () => {
    // when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
    // not supported in all browsers though and sometimes needs a prefix, so we need a shim
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
    const canvas = Dom.getElement(`.${className}`),
      ctx = canvas.getContext('2d'),
      // full screen dimensions
      cw = window.innerWidth,
      ch = window.innerHeight,
      // firework collection
      fireworks = [],
      // particle collection
      particles = [],
      // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
      limiterTotal = 10,
      // this will time the auto launches of fireworks, one launch per 80 loop ticks
      timerTotal = 80

    // mouse x, y coordinate,
    let mx,
      my,
      // starting hue
      hue = 120,
      limiterTick = 0,
      timerTick = 0,
      mousedown = false

    // set canvas dimensions
    canvas.width = cw
    canvas.height = ch

    // main demo loop
    function loop() {
      // this function will run endlessly with requestAnimationFrame
      requestAnimFrame(loop)

      // increase the hue to get different colored fireworks over time
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
              particles
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
          fireworks.push(new Firework(cw / 2, ch, mx, my, particles))
          limiterTick = 0
        }
      } else {
        limiterTick++
      }
    }

    // mouse event bindings
    // update the mouse coordinates on mousemove
    canvas.addEventListener('mousemove', function(e) {
      mx = e.pageX - canvas.offsetLeft
      my = e.pageY - canvas.offsetTop
    })

    // toggle mousedown state and prevent canvas from being selected
    canvas.addEventListener('mousedown', function(e) {
      e.preventDefault()
      mousedown = true
    })

    canvas.addEventListener('mouseup', function(e) {
      e.preventDefault()
      mousedown = false
    })

    // once the window loads, we are ready for some fireworks!
    loop()
  }

  useEffect(() => {
    init()
    return () => {}
  })
}
