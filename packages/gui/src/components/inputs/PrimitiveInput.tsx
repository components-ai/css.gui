import { DEFAULT_LENGTH } from '../../lib/constants'
import {
  CSSUnitValue,
  Length,
  Primitive,
  ResponsiveLength,
} from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { ResponsiveInput } from '../Responsive'
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
      return ResponsiveKeywordInput
    case 'number':
      return NumberInput
    case 'integer':
      return IntegerInput
    case 'percentage':
      return PercentageInput
    case 'length':
      return ResponsiveLengthInput
    case 'time':
      return TimeInput
    case 'string':
      return StringInput
    case 'color':
      return ColorInput
  }
}

const DEFAULT_KEYWORD = 'inherit'
const ResponsiveKeywordInput = ({
  value,
  onChange,
  onRemove,
  label,
  keywords,
  responsive,
  topLevel,
}: EditorPropsWithLabel<string> & {
  keywords: string[]
  responsive?: boolean
}) => {
  if (responsive) {
    return (
      <ResponsiveInput
        label={label}
        value={value}
        onChange={(newValue: any) => onChange(newValue)}
        defaultValue={DEFAULT_KEYWORD}
        onRemove={onRemove}
        Component={KeywordInput}
        componentProps={{ options: keywords, topLevel }}
      />
    )
  }

  return (
    <KeywordInput
      label={label}
      value={value || DEFAULT_KEYWORD}
      onChange={onChange}
      onRemove={onRemove}
      options={keywords}
      topLevel={topLevel}
    />
  )
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

const ResponsiveLengthInput = ({
  value,
  onChange,
  onRemove,
  label,
  property,
  ...props
}: EditorPropsWithLabel<Length | ResponsiveLength> & { property: string }) => {
  return (
    <ResponsiveInput
      label={label}
      value={value}
      defaultValue={DEFAULT_LENGTH}
      onChange={onChange}
      onRemove={onRemove}
      Component={LengthInput}
      property={property}
      componentProps={{
        ...props,
        keyword: true,
      }}
    />
  )
}
