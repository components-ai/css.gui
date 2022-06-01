import { CSSUnitValue, Primitive } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { ColorInput } from './ColorInput'
import { DimensionInput } from './Dimension'
import { KeywordInput } from './KeywordInput'
import { LengthInput } from './LengthInput'
import { StringInput } from './StringInput'
import { TimeInput } from './TimeInput'

interface Props extends EditorPropsWithLabel<any> {
  input: Primitive
  // TODO more robustly type the possible props of primitive inputs
  [prop: string]: any
}

export function PrimitiveInput({ input, ...props }: Props) {
  const Component = getPrimitiveInput(input)
  return <Component {...(props as any)} />
}

function getPrimitiveInput(type: Primitive) {
  switch (type) {
    case 'keyword':
      return KeywordInput2
    case 'number':
      return NumberInput
    case 'integer':
      return IntegerInput
    case 'percentage':
      return PercentageInput
    case 'length':
      return LengthInput
    case 'time':
      return TimeInput
    case 'string':
      return StringInput
    case 'color':
      return ColorInput
  }
}

// remap the prop names
const KeywordInput2 = ({ keywords, ...props }: any) => {
  return <KeywordInput options={keywords} {...props} />
}

const NumberInput = ({
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
      steps={{ number: 0.1 }}
      {...props}
    />
  )
}

const IntegerInput = ({
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

const PercentageInput = ({
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
