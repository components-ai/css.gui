import { Time, TIME_UNITS } from '../../types/css'
import { dimension } from './dimension'

const timeRanges = {
  s: [0, 2],
  ms: [0, 2000],
} as const

const timeConversions = {
  ms: 1000,
  s: 1,
}

const timeSteps = {
  ms: 25,
  s: 0.025,
}

export function time({ defaultValue }: { defaultValue?: Time } = {}) {
  return dimension({
    type: 'time',
    defaultValue,
    steps: timeSteps,
    regenRanges: timeRanges,
    conversions: timeConversions,
    units: TIME_UNITS,
  })
}
