import { Label } from 'theme-ui'
import { stringifyValues } from '../../lib/stringify'
import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { GeometryBox, GEOMETRY_BOX_KEYWORDS } from '../../types/css'
import { BasicShapeInput } from './BasicShape/input'
import { stringifyBasicShape } from './BasicShape/stringify'
import { BasicShape } from './BasicShape/types'
import { SelectInput } from './SelectInput'

// TODO `url()` option
interface ClipPath {
  shape: BasicShape
  box: GeometryBox
}

export function ClipPathInput(props: EditorPropsWithLabel<ClipPath>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <BasicShapeInput {...getInputProps(props, 'shape')} />
      <SelectInput
        {...getInputProps(props, 'box')}
        options={GEOMETRY_BOX_KEYWORDS}
      />
    </div>
  )
}

export function stringifyClipPath(value: ClipPath) {
  return stringifyValues([stringifyBasicShape(value.shape), value.box])
}
