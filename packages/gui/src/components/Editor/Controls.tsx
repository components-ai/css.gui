import produce from 'immer'
import { ComponentType, ReactChild, useId } from 'react'
import pascal from 'pascalcase'
import {
  CSSUnitValue,
  Length,
  ResponsiveLength,
  Styles,
  TIME_UNITS,
} from '../../types/css'
import { Theme } from '../../types/theme'
import { EditorProvider, useEditor } from '../providers/EditorContext'
import { EditorData, KeyArg, Recipe } from '../providers/types'
import { useFieldset } from './Fieldset'
import { joinPath } from '../providers/util'
import { properties } from '../../data/properties'
import { ColorInput } from '../ColorInput'
import { LengthInput } from '../LengthInput'
import { ResponsiveInput } from '../Responsive'
import { sentenceCase } from '../../lib/util'
import { EditorProps } from '../../types/editor'
import { DimensionInput } from '../Dimension'
import { SelectInput } from '../SelectInput'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { Label } from '../primitives'
import { kebabCase } from 'lodash-es'
import { isThemeable } from '../../lib/theme'

type ControlProps = {
  field: KeyArg
}
const Control = ({ field }: ControlProps) => {
  const { getField, setField } = useEditor()
  const fieldset = useFieldset()
  const property = field.toString()
  const Component: ComponentType<any> = getInputComponent(property)

  if (!Component) {
    console.error(`Unknown field: ${field}, ignoring`)
    return null
  }

  const fullField = fieldset ? joinPath(fieldset.name, field) : field

  return (
    <Component
      label={sentenceCase(property)}
      value={getField(fullField)}
      onChange={(newValue: any) => {
        setField(fullField, newValue)
      }}
      property={property}
      {...properties[property]}
    />
  )
}

export const Inputs: Record<string, any> = {}
Object.keys(properties).forEach((field: string) => {
  Inputs[pascal(field)] = () => <Control field={field} />
})

type ControlsProps = {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
  children?: ReactChild
}
export const Editor = ({
  theme,
  styles,
  onChange,
  children,
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
    <EditorProvider theme={theme} value={styles} onChange={handleStylesChange}>
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
    case 'length':
      return ResponsiveLengthInput
    case 'time':
      return TimeInput
    case 'color':
      return ColorInput
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
      units={['number', 'keyword']}
      steps={{ number: 1 }}
      {...props}
    />
  )
}

const ResponsiveLengthInput = ({
  value,
  onChange,
  label,
  property,
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
        property,
        theme: isThemeable(property),
        keyword: true,
      }}
    />
  )
}

const TimeInput = ({
  value,
  onChange,
  label,
}: EditorPropsWithLabel<CSSUnitValue>) => {
  return (
    <DimensionInput
      value={value}
      label={label}
      onChange={onChange}
      units={[...TIME_UNITS, 'keyword']}
      steps={timeSteps}
      conversions={timeConversions}
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
      options={[...(keywords ?? []), ...GLOBAL_KEYWORDS]}
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
