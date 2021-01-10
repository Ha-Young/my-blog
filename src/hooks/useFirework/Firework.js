import { Particle, random } from './Particle'

// create firework
function Firework(sx, sy, tx, ty, particles, isDarkMode = false) {
  // actual coordinates
  this.x = sx
  this.y = sy
  // starting coordinates
  this.sx = sx
  this.sy = sy
  // target coordinates
  this.tx = tx
  this.ty = ty

  this.particles = particles

  this.isDarkMode = isDarkMode

  // distance from starting point to target
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty)
  this.distanceTraveled = 0
  // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = []
  this.coordinateCount = 3
  // populate initial coordinate collection with the current coordinates
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y])
  }
  this.angle = Math.atan2(ty - sy, tx - sx)
  this.speed = 2
  this.acceleration = 1.05
  this.brightness = this.isDarkMode ? random(60, 100) : random(10, 30)
  this.alpha = this.isDarkMode ? 0.7 : 0.5
  // circle target indicator radius
  this.targetRadius = 1
}

// update firework
Firework.prototype.update = function(fireworks, index, hue) {
  // remove last item in coordinates array
  this.coordinates.pop()
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y])

  // cycle the circle target indicator radius
  if (this.targetRadius < 8) {
    this.targetRadius += 0.3
  } else {
    this.targetRadius = 1
  }

  // speed up the firework
  this.speed *= this.acceleration

  // get the current velocities based on angle and speed
  var vx = Math.cos(this.angle) * this.speed,
    vy = Math.sin(this.angle) * this.speed
  // how far will the firework have traveled with velocities applied?
  this.distanceTraveled = calculateDistance(
    this.sx,
    this.sy,
    this.x + vx,
    this.y + vy
  )

  // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.particles, this.tx, this.ty, hue, this.isDarkMode)
    // remove the firework, use the index passed into the update function to determine which to remove
    fireworks.splice(index, 1)
  } else {
    // target not reached, keep traveling
    this.x += vx
    this.y += vy
  }
}

// draw firework
Firework.prototype.draw = function(ctx, hue) {
  ctx.beginPath()
  // move to the last tracked coordinate in the set, then draw a line to the current x and y
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  )
  ctx.lineTo(this.x, this.y)
  ctx.strokeStyle =
    'hsl(' + hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')'
  ctx.stroke()

  ctx.beginPath()
  // draw the target for this firework with a pulsing circle
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2)
  ctx.stroke()
}

// create particle group/explosion
function createParticles(particles, x, y, hue, isDarkMode) {
  // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  var particleCount = 30
  while (particleCount--) {
    particles.push(new Particle(x, y, hue, isDarkMode))
  }
}

// calculate the distance between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
  var xDistance = p1x - p2x,
    yDistance = p1y - p2y
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

export { Firework, random }
