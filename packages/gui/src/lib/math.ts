/**
 * Round `value` to the nearest multiple of `step`
 *
 * roundToStep(1337, 25) // 1325
 * roundToStep(0.423, 0.025) // 0.425
 */
export function roundToStep(value: number, step: number) {
  const rounded = Math.round(value / step) * step
  return round(rounded, 5) // round to some decimal places to avoid floating point errors
}

export function round(value: number, places: number) {
  const multiple = 10 ** places
  return Math.round(value * multiple) / multiple
}
