// create particle
function Particle(x, y, hue, isDarkMode) {
  this.x = x
  this.y = y
  // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = []
  this.coordinateCount = 5
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y])
  }
  // set a random angle in all possible directions, in radians
  this.angle = random(0, Math.PI * 2)
  this.speed = random(1, 10)
  // friction will slow the particle down
  this.friction = 0.95
  // gravity will be applied and pull the particle down
  this.gravity = 1
  // set the hue to a random number +-20 of the overall hue variable
  this.hue = random(hue - 20, hue + 20)
  this.brightness = isDarkMode ? random(60, 90) : random(10, 50)
  this.alpha = isDarkMode ? 0.9 : 0.5
  // set how fast the particle fades out
  this.decay = random(0.015, 0.03)
}

// update particle
Particle.prototype.update = function(particles, index) {
  // remove last item in coordinates array
  this.coordinates.pop()
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y])
  // slow down the particle
  this.speed *= this.friction
  // apply velocity
  this.x += Math.cos(this.angle) * this.speed
  this.y += Math.sin(this.angle) * this.speed + this.gravity
  // fade out the particle
  this.alpha -= this.decay

  // remove the particle once the alpha is low enough, based on the passed in index
  if (this.alpha <= this.decay) {
    particles.splice(index, 1)
  }
}

// draw particle
Particle.prototype.draw = function(ctx) {
  ctx.beginPath()
  // move to the last tracked coordinates in the set, then draw a line to the current x and y
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  )
  ctx.lineTo(this.x, this.y)
  ctx.strokeStyle =
    'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')'
  ctx.stroke()
}

// get a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min
}

export { Particle, random }
