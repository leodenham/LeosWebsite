let mouseX = 0
let mouseY = 0
let allStars = []
let intervalId
const timestep = 0.5
const iterationsPerTimestep = 2
const newStarInterval = 10
const gravity = 0.5
var photoOfLeo = document.getElementById('photoOfLeoParent')

class Star {
  constructor(element, x, y) {
    this.element = element

    this.x = x || mouseX
    this.y = y || mouseY
    this.velX = -5 + Math.random() * 10
    this.velY = -Math.random() * 8
    this.currentTime = 0
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
  }

  update() {
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
    this.x += (this.velX * timestep) / iterationsPerTimestep
    this.y += (this.velY * timestep) / iterationsPerTimestep
    this.currentTime += (timestep * 0.01) / iterationsPerTimestep
    this.velY += (gravity * timestep) / iterationsPerTimestep
  }
}

const createStar = (context) => {
  const newStar = document.createElement('div')
  newStar.setAttribute('class', 'star')
  let x = undefined
  let y = undefined
  if (context === 'photoOfLeo') {
    var rect = photoOfLeo.getBoundingClientRect()
    // Calculate the center coordinates
    x = rect.left + rect.width / 2
    y = rect.top + rect.height / 2 + 20
  }
  const starObject = new Star(newStar, x, y)

  if (context === 'github') {
    newStar.style.backgroundColor = '#f0f0f0'
  } else if (context === 'linkedin') {
    newStar.style.backgroundColor = '#007ebb'
  } else if (context === 'photoOfLeo') {
    newStar.style.backgroundColor = '#eb213f'
  }

  allStars.push(starObject)
  document.body.appendChild(newStar)
}

const updateStars = () => {
  for (let i = 0; i < iterationsPerTimestep; i++) {
    allStars.forEach((star) => star.update())
    allStars
      .filter((star) => star.currentTime >= 2)
      .forEach((star) => document.body.removeChild(star.element))
    allStars = allStars.filter((star) => star.currentTime < 2)
  }
}

setInterval(updateStars, 1)

var myName = document.getElementById('leosName')
var github = document.getElementById('github')
var linkedIn = document.getElementById('linkedin')

myName.addEventListener('mouseover', () => {
  intervalId = setInterval(createStar, newStarInterval)
})

myName.addEventListener('mouseout', () => {
  clearInterval(intervalId)
})

github.addEventListener('mouseover', () => {
  intervalId = setInterval(() => createStar('github'), newStarInterval)
})

github.addEventListener('mouseout', () => {
  clearInterval(intervalId)
})

linkedIn.addEventListener('mouseover', () => {
  intervalId = setInterval(() => createStar('linkedin'), newStarInterval)
})

linkedIn.addEventListener('mouseout', () => {
  clearInterval(intervalId)
})

photoOfLeo.addEventListener('mouseover', (e) => {
  intervalId = setInterval(() => createStar('photoOfLeo'), newStarInterval)
})

photoOfLeo.addEventListener('mouseout', () => {
  clearInterval(intervalId)
})

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX
  mouseY = e.clientY
})

const leosName = document.getElementById('leosName')

// setInterval(() => {
//   const italicLevel = Math.floor(Math.random() * 9) + 1;
//   const weight = Math.random() * 500 + 400;
//   const width = Math.random() * 100 + 50;
//   leosName.style.fontVariationSettings = `"ital" ${italicLevel}, "wght" ${weight}, "wdth" ${width}`;
// }, 1000);
