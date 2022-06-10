import { Angle, ANGLE_UNITS } from '../../types/css'
import { DimensionInput } from './Dimension'
import { EditorPropsWithLabel } from '../../types/editor'

// TODO allow optional percentage for conic gradients
export function AngleInput(props: EditorPropsWithLabel<Angle>) {
  return (
    <DimensionInput
      {...props}
      units={ANGLE_UNITS}
      steps={angleSteps}
      conversions={angleConversions}
    />
  )
}

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
