import { EditorPropsWithLabel } from '../../lib/util'
import { Time, TIME_UNITS } from '../../types/css'
import { DimensionInput } from './Dimension'

export const TimeInput = (props: EditorPropsWithLabel<Time>) => {
  return (
    <DimensionInput
      units={TIME_UNITS}
      steps={timeSteps}
      conversions={timeConversions}
      {...props}
    />
  )
}

const timeConversions = {
  ms: 1000,
  s: 1,
}

const timeSteps = {
  ms: 25,
  s: 0.025,
}
