const intRegex = /\d/

export function inputOdometerHandler (e) {
  const value = Number(`${e.target.value}${e.key}`)
  const validMinMax = value > 0 && value < 1000000
  
  if (e.target.value.length === 0 || (intRegex.test(e.key) && validMinMax)) {
    return
  } else {
    e.preventDefault()
  }
}