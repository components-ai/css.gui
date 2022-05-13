import { stringifyValues } from '../../lib/stringify'
import { getInputProps } from '../../lib/util'
import { EditorProps } from '../../types/editor'
import { Label } from '../primitives'
import { SelectInput } from './SelectInput'

interface ScrollSnapAlign {
  x: SnapPosition
  y: SnapPosition
}

const snapPositions = ['none', 'start', 'center', 'end'] as const
type SnapPosition = typeof snapPositions[number]

export function ScrollSnapAlignInput(props: EditorProps<ScrollSnapAlign>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <div sx={{ display: 'grid', gap: 1 }}>
        <SelectInput {...getInputProps(props, 'x')} options={snapPositions} />
        <SelectInput {...getInputProps(props, 'y')} options={snapPositions} />
      </div>
    </div>
  )
}

export function stringifyScrollSnapAlign(value: ScrollSnapAlign) {
  const { x, y } = value
  return stringifyValues([x, y])
}
