// Return a new array with the given indices flipped
export function flip<T>(array: T[], i1: number, i2: number) {
  const copy = [...array]
  copy[i1] = array[i2]
  copy[i2] = array[i1]
  return copy
}

// Return a new array with the value at the index removed
export function remove<T>(array: T[], index: number) {
  const copy = [...array]
  copy.splice(index, 1)
  return copy
}

export function insert<T>(array: T[], index: number, newValue: T) {
  const copy = [...array]
  copy.splice(index, 0, newValue)
  return copy
}

export function replace<T>(array: T[], index: number, newValue: T) {
  const copy = [...array]
  copy.splice(index, 1, newValue)
  return copy
}

export function split<T>(array: T[], separator: T) {
  const result = []
  let current: T[] = []
  for (const item of array) {
    if (item === separator) {
      result.push(current)
      current = []
    } else {
      current.push(item)
    }
  }
  result.push(current)
  return result
}
