import { stringifyUnit } from '../../lib/stringify'
import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { LengthPercentage } from '../../types/css'
import { Label } from '../primitives'
import { LengthInput } from './LengthInput'

interface PerspectiveOrigin {
  x: LengthPercentage
  y: LengthPercentage
}
export function PerspectiveOriginInput(
  props: EditorPropsWithLabel<PerspectiveOrigin>
) {
  return (
    <div>
      <Label>{props.label}</Label>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <LengthInput
          percentage
          {...getInputProps(props, 'x')}
          keywords={['left', 'center', 'right']}
        />
        <LengthInput
          percentage
          {...getInputProps(props, 'y')}
          keywords={['top', 'center', 'bottom']}
        />
      </div>
    </div>
  )
}

export function stringifyPerspectiveOrigin(value: PerspectiveOrigin) {
  return `${stringifyUnit(value.x)} ${stringifyUnit(value.y)}`
}
