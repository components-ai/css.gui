import produce from 'immer'
import {
  Children,
  ComponentType,
  Fragment,
  isValidElement,
  ReactNode,
  useEffect,
  useId,
} from 'react'
import { camelCase, kebabCase, uniq } from 'lodash-es'
import {
  CSSUnitValue,
  Length,
  MultidimensionalLength,
  ResponsiveLength,
  Styles,
} from '../../types/css'
import { Theme } from '../../types/theme'
import { EditorProvider, useEditor } from '../providers/EditorContext'
import { useDynamicControls } from '../providers/DynamicPropertiesContext'
import { EditorData, KeyArg, Recipe } from '../providers/types'
import { GenericFieldset, useFieldset } from './Fieldset'
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
import { useThemeProperty } from '../providers/ThemeContext'
import { PositionInput } from '../inputs/PositionInput'
import { TimeInput } from '../inputs/TimeInput'
import { UnitSteps } from '../../lib'
import { pascalCase } from '../../lib/util'
import { UnitRanges } from '../../data/ranges'
import { StringInput } from '../inputs/StringInput'
import { DEFAULT_LENGTH } from '../../lib/constants'
import { getDefaultValue } from '../../lib/defaults'
import { MultidimensionInput } from '../inputs/Multidimension'
import { Responsive } from '../Responsive/Input'
import { AddPropertyControl } from '../AddProperty'
import { DeletePropButton } from '../inputs/Dimension/Input'
import { isFieldsetGroup, partitionProperties, sortProperties } from './util'
import { stylesToEditorSchema } from '../../lib/transformers/styles-to-editor-schema'
import { removeInternalCSSClassSyntax } from '../../lib/classes'

export const getPropertyFromField = (field: KeyArg) => {
  if (Array.isArray(field)) {
    return field[field.length - 1].toString()
  }

  return field.toString()
}

interface ControlProps extends InputProps {
  field: KeyArg
  showRemove?: boolean
}
const Control = ({ field, showRemove = false, ...props }: ControlProps) => {
  const { getField, setField, removeField } = useEditor()
  const { removeDynamicProperty } = useDynamicControls()
  const fieldset = useFieldset()
  const property = getPropertyFromField(field)
  const Component: ComponentType<any> | null = getInputComponent(property)
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

  const fieldsetName = fieldset?.name ?? null
  const fullField = fieldsetName ? joinPath(fieldsetName, field) : field
  const componentProps = {
    label: sentenceCase(property),
    themeValues: themeValues,
    ...properties[property],
    ...props,
    keywords,
  }

  if (dependantProperties.length) {
    return (
      <ComponentWithPropertyGroup
        dependantProperties={dependantProperties}
        property={property}
        fullField={fullField}
        showRemove
        {...componentProps}
      />
    )
  }

  const handleRemoveProperty = () => {
    if (removeDynamicProperty) {
      removeDynamicProperty(property)
    }
    removeField(fullField)
  }

  return (
    <Component
      value={getField(fullField)}
      onChange={(newValue: any) => {
        setField(fullField, newValue)
      }}
      onRemove={showRemove ? handleRemoveProperty : null}
      property={property}
      {...componentProps}
    />
  )
}

interface ComponentGroupProps {
  dependantProperties: string[]
  property: string
  fullField: KeyArg
  showRemove: boolean
}
const ComponentWithPropertyGroup = ({
  dependantProperties,
  property,
  fullField,
  showRemove = false,
  ...props
}: ComponentGroupProps) => {
  const Component: ComponentType<any> | null = getInputComponent(property)
  const { getFields, setFields, removeField } = useEditor()
  if (!Component) {
    console.error(`Unknown field: ${property}, ignoring`)
    return null
  }

  return (
    <Component
      value={getFields([...dependantProperties, property])}
      onChange={(newValue: any) => setFields(newValue, dependantProperties)}
      onRemove={showRemove ? () => removeField(fullField) : null}
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
  const Component = (props: InputProps) => <Control {...props} field={field} />
  Component.displayName = pascalCase(field)
  Inputs[pascalCase(field)] = Component
})

interface ControlsProps {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
  children?: ReactNode
  hideResponsiveControls?: boolean
  showAddProperties?: boolean
}
export const Editor = ({
  theme,
  styles,
  onChange,
  children,
  hideResponsiveControls,
  showAddProperties,
}: ControlsProps) => {
  const handleStylesChange = (recipe: Recipe<EditorData<any>>) => {
    const newData = produce(stylesToEditorSchema(styles), (draft: any) => {
      const valueData: EditorData<any> = {
        value: draft,
      }

      // @ts-ignore
      recipe(valueData)
      draft = valueData as any
    })

    onChange(newData)
  }

  useEffect(() => {
    if (children) {
      const defaultStyles = getDefaultsFromChildren(children)
      // TODO this should be a deep merge when we support defaults for nested
      onChange({ ...defaultStyles, ...styles })
    }
  }, [])

  return (
    <EditorProvider
      theme={theme}
      value={styles}
      onChange={handleStylesChange}
      hideResponsiveControls={hideResponsiveControls}
    >
      <EditorControls showAddProperties={showAddProperties}>
        {children}
      </EditorControls>
    </EditorProvider>
  )
}

interface EditorControlsProps {
  children?: ReactNode
  showAddProperties?: boolean
}
export const EditorControls = ({
  children,
  showAddProperties,
}: EditorControlsProps) => {
  const { value: styles } = useEditor()
  const [fieldsets, properties] = partitionProperties(uniq(Object.keys(styles)))
  const controls = children ? (
    children
  ) : (
    <ControlSet properties={sortProperties(properties)} />
  )
  const fieldsetControls = children ? null : (
    <ControlSet properties={sortProperties(fieldsets)} />
  )

  return (
    <>
      {controls}
      {showAddProperties ? (
        <div sx={{ mt: 3 }}>
          <AddPropertyControl styles={styles} />
        </div>
      ) : null}
      {fieldsetControls}
      {children ? <DynamicControls /> : null}
    </>
  )
}

const DynamicControls = () => {
  const { dynamicProperties } = useDynamicControls()

  return dynamicProperties?.length ? (
    <ControlSet properties={dynamicProperties} />
  ) : null
}

type ControlSetProps = {
  field?: KeyArg
  properties: string[]
}
const ControlSet = ({ field, properties }: ControlSetProps) => {
  return (
    <div sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {properties.map((property) => {
        const fullField = field ? joinPath(field, property) : property

        return isFieldsetGroup(property) ? (
          <FieldsetControl key={property} property={property} />
        ) : (
          <Control key={property} field={fullField} showRemove />
        )
      })}
    </div>
  )
}

type FieldsetControlProps = {
  field?: KeyArg
  property: string
}
const FieldsetControl = ({ field, property }: FieldsetControlProps) => {
  const { getField } = useEditor()
  const styles = getField(field || property)
  const properties = Object.keys(styles)

  return (
    <section>
      <h3>{removeInternalCSSClassSyntax(property)}</h3>
      <GenericFieldset property={property}>
        <ControlSet field={field} properties={properties} />
        <AddPropertyControl
          field={field || property}
          styles={styles}
          label={`Add property to ${property}`}
        />
      </GenericFieldset>
    </section>
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
    case 'multiLength':
      return MultidimensionLengthInput
    case 'time':
      return TimeInput
    case 'string':
      return StringInput
    case 'color':
      return ColorInput
    case 'position':
      return PositionInput
    case 'none':
      return null
    default:
      return TextInput
  }
}

type EditorPropsWithLabel<T> = EditorProps<T> & {
  label: string
  responsive: boolean
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

const MultidimensionLengthInput = ({
  value,
  onChange,
  onRemove,
  label,
  ...props
}: EditorPropsWithLabel<Responsive<CSSUnitValue | MultidimensionalLength>> & {
  property: string
}) => {
  return (
    <ResponsiveInput
      label={label}
      value={value}
      defaultValue={DEFAULT_LENGTH as CSSUnitValue}
      onChange={onChange}
      onRemove={onRemove}
      Component={MultidimensionInput}
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
  onRemove,
  label,
  keywords,
  responsive,
}: EditorPropsWithLabel<string> & { keywords: string[] }) => {
  if (responsive) {
    return (
      <ResponsiveInput
        label={label}
        value={value}
        onChange={(newValue: any) => onChange(newValue)}
        defaultValue={DEFAULT_KEYWORD}
        onRemove={onRemove}
        Component={SelectInput}
        componentProps={{
          options: keywords,
        }}
      />
    )
  }

  return (
    <SelectInput
      label={label}
      value={value || DEFAULT_KEYWORD}
      onChange={onChange}
      onRemove={onRemove}
      options={keywords}
    />
  )
}

const TextInput = ({
  value,
  onChange,
  onRemove,
  label,
}: EditorPropsWithLabel<string>) => {
  const id = `${useId()}-${kebabCase(label)}`
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div sx={{ display: 'flex', flexDirection: 'row' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{ mr: 1 }}
        />
        {onRemove && <DeletePropButton onRemove={onRemove} />}
      </div>
    </div>
  )
}

/**
 * Extract the defaults from the editor's children
 */
function getDefaultsFromChildren(children: ReactNode): Record<string, any> {
  // Based on: https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/components.tsx#L270
  let defaults: Record<string, any> = {}
  Children.forEach(children, (element) => {
    if (!isValidElement(element)) {
      return
    }
    if (element.type === Fragment) {
      defaults = {
        ...defaults,
        ...getDefaultsFromChildren(element.props.children),
      }
    }
    // TODO defaults on nested fields
    if (
      typeof element.type === 'function' &&
      (element.type as any).displayName
    ) {
      const property = camelCase((element.type as any).displayName)
      defaults = {
        ...defaults,
        [property]: getDefaultValue(property),
      }
    }
    if (element.props.children) {
      defaults = {
        ...defaults,
        ...getDefaultsFromChildren(element.props.children),
      }
    }
  })
  return defaults
}
