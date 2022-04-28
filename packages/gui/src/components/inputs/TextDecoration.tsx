import { stringifyValues } from '../../lib/stringify'
import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { Color, Length } from '../../types/css'
import { Label } from '../primitives'
import { ColorInput } from './ColorInput'
import { LengthInput } from './LengthInput'
import { SelectInput } from './SelectInput'

interface TextDecoration {
  color: Color
  line: TextDecorationLine
  style: TextDecorationStyle
  thickness: Length
}

export const textDecorationLines = [
  'none',
  'underline',
  'overline',
  'line-through',
  'blink',
  'underline line-through',
  'underline overline',
  'overline line-through',
  'underline overline line-through',
] as const
type TextDecorationLine = typeof textDecorationLines[number]

export const textDecorationStyles = [
  'solid',
  'double',
  'dotted',
  'dashed',
  'wavy',
] as const
type TextDecorationStyle = typeof textDecorationStyles[number]

// TODO I want this to be collapsible
export function TextDecorationInput(
  props: EditorPropsWithLabel<TextDecoration>
) {
  return (
    <div>
      <Label>{props.label}</Label>
      <ColorInput {...getInputProps(props, 'color')} />
      <SelectInput
        {...getInputProps(props, 'line')}
        options={textDecorationLines}
      />
      <SelectInput
        {...getInputProps(props, 'style')}
        options={textDecorationStyles}
      />
      <LengthInput
        percentage
        {...getInputProps(props, 'thickness')}
        keywords={['auto', 'from-font']}
      />
    </div>
  )
}

export function stringifyTextDecoration(value: TextDecoration) {
  const { color, line, style, thickness } = value
  return stringifyValues([color, line, style, thickness])
}
