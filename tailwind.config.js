const fromRange =
  (unit, step, max) =>
  Object
  .fromEntries(
    [...Array(Math.floor(max/step)).keys()]
    .map(x => [`${(x+1) * step}`, `${(x+1)}${unit}`])
  )



const fromArray =
  (unit, arr) =>
  Object
  .fromEntries(
    arr
    .map(x => [`${x}`, `${x}${unit}`])
  )

  

module.exports = {
  content: ['./public/**/*.html', './src/**/*.js'],
  theme: {},
  plugins: [],
}
