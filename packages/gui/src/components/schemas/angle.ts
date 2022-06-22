import { Angle, ANGLE_UNITS } from '../../types/css'
import { dimension } from './dimension'

const angleRanges = {
  deg: [0, 360],
  turn: [0, 1],
  rad: [0, 2 * Math.PI],
  grad: [0, 400],
} as const

const angleConversions = {
  deg: 360,
  turn: 1,
  rad: 2 * Math.PI,
  grad: 400,
}

export const angleSteps = {
  deg: 1,
  turn: 0.01,
  rad: 0.01,
  grad: 1,
}

export function angle({ defaultValue }: { defaultValue?: Angle } = {}) {
  return dimension({
    type: 'angle',
    defaultValue,
    steps: angleSteps,
    regenRanges: angleRanges,
    conversions: angleConversions,
    units: ANGLE_UNITS,
  })
}
