import { stringifyValues } from '../../lib/stringify'
import { getInputProps } from '../../lib/util'
import { Length } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { LengthInput } from './LengthInput'

interface BorderSpacing {
  x: Length
  y: Length
}

export function BorderSpacingInput(props: EditorPropsWithLabel<BorderSpacing>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <div sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <LengthInput
          {...getInputProps(props, 'x')}
          percentage
          keywords={['left', 'center', 'right']}
        />
        <LengthInput
          {...getInputProps(props, 'y')}
          percentage
          keywords={['top', 'center', 'bottom']}
        />
      </div>
    </div>
  )
}

export function stringifyBorderSpacing(value: BorderSpacing) {
  return stringifyValues([value.x, value.y])
}
