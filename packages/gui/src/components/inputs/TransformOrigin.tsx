import { stringifyValues } from '../../lib/stringify'
import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { Length, LengthPercentage } from '../../types/css'
import { Label } from '../primitives'
import { LengthInput } from './LengthInput'

interface TransformOrigin {
  x: LengthPercentage
  y: LengthPercentage
  z: Length
}
export function TransformOriginInput(
  props: EditorPropsWithLabel<TransformOrigin>
) {
  return (
    <div>
      <Label>{props.label}</Label>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
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
        <LengthInput {...getInputProps(props, 'z')} />
      </div>
    </div>
  )
}

export function stringifyTransformOrigin(value: TransformOrigin) {
  const { x, y, z } = value
  return stringifyValues([x, y, z])
}
