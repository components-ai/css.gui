import produce from 'immer'
import { ComponentType, ReactChild, useId } from 'react'
import { CSSUnitValue, Length, ResponsiveLength, Styles } from '../../types/css'
import { Theme } from '../../types/theme'
import { EditorProvider, useEditor } from '../providers/EditorContext'
import { EditorData, KeyArg, Recipe } from '../providers/types'
import { useFieldset } from './Fieldset'
import { joinPath } from '../providers/util'
import { properties } from '../../data/properties'
import { ColorInput } from '../inputs/ColorInput'
import { LengthInput } from '../inputs/LengthInput'
import { ResponsiveInput } from '../Responsive'
import { sentenceCase } from '../../lib/util'
import { EditorProps } from '../../types/editor'
import { DimensionInput } from '../inputs/Dimension'
import { SelectInput } from '../inputs/SelectInput'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { Label } from '../primitives'
import { kebabCase } from 'lodash-es'
import { useThemeProperty } from '../providers/ThemeContext'
import { PositionInput } from '../inputs/PositionInput'
import { TimeInput } from '../inputs/TimeInput'
import { UnitSteps } from '../../lib'
import { pascalCase } from '../../lib/util'
import { UnitRanges } from '../../data/ranges'
import { StringInput } from '../inputs/StringInput'

interface ControlProps extends InputProps {
  field: KeyArg
}
const Control = ({ field, ...props }: ControlProps) => {
  const { getField, setField } = useEditor()
  const fieldset = useFieldset()
  const property = field.toString()
  const Component: ComponentType<any> = getInputComponent(property)
  const themeValues = useThemeProperty(property)
  const keywords = [
    ...(properties[property].keywords ?? []),
    ...GLOBAL_KEYWORDS,
  ]
  const dependantProperties = properties[property].dependantProperties ?? []

  if (!Component) {
    console.error(`Unknown field: ${field}, ignoring`)
    return null
  }

  const fullField = fieldset ? joinPath(fieldset.name, field) : field
  const componentProps = {
    label: sentenceCase(property),
    themeValues: themeValues,
    keywords,
    ...properties[property],
    ...props,
  }

  if (dependantProperties.length) {
    return (
      <ComponentWithPropertyGroup
        dependantProperties={dependantProperties}
        property={property}
        {...componentProps}
      />
    )
  }

  return (
    <Component
      value={getField(fullField)}
      onChange={(newValue: any) => {
        setField(fullField, newValue)
      }}
      {...componentProps}
    />
  )
}

interface ComponentGroupProps {
  dependantProperties: string[]
  property: string
}
const ComponentWithPropertyGroup = ({
  dependantProperties,
  property,
  ...props
}: ComponentGroupProps) => {
  const Component: ComponentType<any> = getInputComponent(property)
  const { getFields, setFields } = useEditor()

  return (
    <Component
      value={getFields([...dependantProperties, property])}
      onChange={(newValue: any) => setFields(newValue, dependantProperties)}
      {...props}
    />
  )
}

type InputProps = {
  label?: string
  steps?: UnitSteps
  range?: UnitRanges
}
export const Inputs: Record<string, any> = {}
Object.keys(properties).forEach((field: string) => {
  Inputs[pascalCase(field)] = (props: InputProps) => (
    <Control {...props} field={field} />
  )
})

type ControlsProps = {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
  children?: ReactChild
  hideResponsiveControls?: boolean
}
export const Editor = ({
  theme,
  styles,
  onChange,
  children,
  hideResponsiveControls,
}: ControlsProps) => {
  const properties = Object.keys(styles)

  const handleStylesChange = (recipe: Recipe<EditorData<any>>) => {
    const newData = produce(styles, (draft: any) => {
      const valueData: EditorData<any> = {
        value: draft,
      }

      // @ts-ignore
      recipe(valueData)
      draft = valueData as any
    })

    onChange(newData)
  }

  const controls = children ? (
    children
  ) : (
    <>
      {properties.map((property) => {
        return <Control key={property} field={property} />
      })}
    </>
  )

  return (
    <EditorProvider
      theme={theme}
      value={styles}
      onChange={handleStylesChange}
      hideResponsiveControls={hideResponsiveControls}
    >
      {controls}
    </EditorProvider>
  )
}

function getInputComponent(property: string) {
  const propertyData = properties[property]
  if (typeof propertyData.type === 'function') {
    return propertyData.type
  }
  return getPrimitiveInput(propertyData.type)
}

function getPrimitiveInput(type: string) {
  switch (type) {
    case 'keyword':
      return KeywordInput
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
    case 'position':
      return PositionInput
    default:
      return TextInput
  }
}

type EditorPropsWithLabel<T> = EditorProps<T> & { label: string }
const NumberInput = ({
  value,
  onChange,
  label,
  ...props
}: EditorPropsWithLabel<CSSUnitValue>) => {
  return (
    <DimensionInput
      value={value}
      label={label}
      onChange={onChange}
      units={['number']}
      steps={{ number: 0.1 }}
      {...props}
    />
  )
}

const IntegerInput = ({
  value,
  onChange,
  label,
  ...props
}: EditorPropsWithLabel<CSSUnitValue>) => {
  return (
    <DimensionInput
      value={value}
      label={label}
      onChange={onChange}
      units={['number']}
      steps={{ number: 1 }}
      {...props}
    />
  )
}

const PercentageInput = ({
  value,
  onChange,
  label,
  ...props
}: EditorPropsWithLabel<CSSUnitValue>) => {
  return (
    <DimensionInput
      value={value}
      label={label}
      onChange={onChange}
      units={['%']}
      steps={{ '%': 0.1 }}
      {...props}
    />
  )
}

const ResponsiveLengthInput = ({
  value,
  onChange,
  label,
  ...props
}: EditorPropsWithLabel<Length | ResponsiveLength> & { property: string }) => {
  return (
    <ResponsiveInput
      label={label}
      value={value}
      onChange={onChange}
      Component={LengthInput}
      componentProps={{
        ...props,
        keyword: true,
      }}
    />
  )
}

const DEFAULT_KEYWORD = 'inherit'
const KeywordInput = ({
  value,
  onChange,
  label,
  keywords,
}: EditorPropsWithLabel<string> & { keywords: string[] }) => {
  return (
    <SelectInput
      label={label}
      value={value || DEFAULT_KEYWORD}
      onChange={onChange}
      options={keywords}
    />
  )
}

const TextInput = ({
  value,
  onChange,
  label,
}: EditorPropsWithLabel<string>) => {
  const id = `${useId()}-${kebabCase(label)}`
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
