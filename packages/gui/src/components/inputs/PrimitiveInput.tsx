import { CSSUnitValue } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { DimensionInput } from './Dimension'

export const IntegerInput = ({
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
      units={['number']}
      steps={{ number: 1 }}
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
