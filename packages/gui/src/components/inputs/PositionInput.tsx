import { getInputProps } from '../../lib/util'
import { Position } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { DeletePropButton } from './Dimension/Input'
import { LengthInput } from './LengthInput'

export function PositionInput({
  onRemove,
  ...props
}: EditorPropsWithLabel<Position>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <div sx={{ display: 'grid', gap: 1, gridTemplateColumns: '1fr 1fr' }}>
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
        {onRemove && <DeletePropButton onRemove={onRemove} />}
      </div>
    </div>
  )
}
