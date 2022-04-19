export function randomHexColor() {
  return (
    '#' +
    ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
  )
}
