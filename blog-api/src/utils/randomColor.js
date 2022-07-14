const color = ['black', 'grey', 'brown', 'pink', 'black', 'olive', 'pink', 'purple', 'blue', 'red', 'green', 'violet', 'orange', 'teal', 'yellow']

function getRandomColor() {
  return color[Math.round(Math.random() * color.length)]
}

module.exports = { getRandomColor }