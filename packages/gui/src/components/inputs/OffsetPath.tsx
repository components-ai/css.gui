import { Label } from 'theme-ui'
import { stringifyValues } from '../../lib/stringify'
import { getInputProps } from '../../lib/util'
import { GeometryBox, GEOMETRY_BOX_KEYWORDS } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { BasicShapeInput } from './BasicShape/input'
import { stringifyBasicShape } from './BasicShape/stringify'
import { BasicShape } from './BasicShape/types'
import { SelectInput } from './SelectInput'

// TODO `url()` and `ray()` options
interface OffsetPath {
  shape: BasicShape
  box: GeometryBox
}

export function OffsetPathInput(props: EditorPropsWithLabel<OffsetPath>) {
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

export function stringifyOffsetPath(value: OffsetPath) {
  return stringifyValues([stringifyBasicShape(value.shape)])
}
