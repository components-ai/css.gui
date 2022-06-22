import { CSSUnitValue } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { DimensionInput } from './Dimension'
import { NumberInput } from './NumberInput'

export const IntegerInput = ({
  value,
  onChange,
  onRemove,
  label,
  ...props
}: EditorPropsWithLabel<number>) => {
  return (
    <NumberInput
      value={value}
      label={label}
      onChange={onChange}
      onRemove={onRemove}
      {...props}
    />
  )
}

export const PercentageInput = ({
  value,
  onChange,
  onRemove,
  label,
  ...props
}: EditorPropsWithLabel<CSSUnitValue>) => {
  return (
    <DimensionInput
      value={value}
      label={label}
      onChange={onChange}
      onRemove={onRemove}
      units={['%']}
      steps={{ '%': 0.1 }}
      {...props}
    />
  )
}
