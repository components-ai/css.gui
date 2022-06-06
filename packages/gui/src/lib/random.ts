import { roundToStep } from './math'

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomStep(min: number, max: number, step: number) {
  min = Math.min(max, min)
  return roundToStep(Math.random() * (max - min) + min, step)
}
