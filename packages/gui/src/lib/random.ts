import { roundToStep } from './math'

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randomStep(min: number, max: number, step: number) {
  min = Math.min(max, min)
  return roundToStep(Math.random() * (max - min) + min, step)
}

export function choose<T>(items: readonly T[]) {
  const index = randomInt(0, items.length)
  return items[index]
}
