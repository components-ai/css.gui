import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { Length } from '../../../types/css'
import { EditorProps } from '../../../types/editor'
import FieldArray from '../../FieldArray'
import { Label } from '../../primitives'
import { LengthInput } from '../LengthInput'
import { PositionInput } from '../PositionInput'
import { SelectInput } from '../SelectInput'
import { stringifyBasicShape } from './stringify'
import {
  BasicShape,
  Circle,
  Ellipse,
  Inset,
  Path,
  Point,
  Polygon,
} from './types'

export function BasicShapeInput(props: EditorPropsWithLabel<BasicShape>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={['inset', 'circle', 'ellipse', 'polygon', 'path']}
      />
      <BasicShapeSwitch {...props} />
    </div>
  )
}

function BasicShapeSwitch(props: EditorProps<BasicShape>) {
  switch (props.value.type) {
    case 'inset': {
      const _props = props as EditorProps<Inset>
      return (
        <div>
          <LengthInput {...getInputProps(_props, 'top')} />
          <LengthInput {...getInputProps(_props, 'right')} />
          <LengthInput {...getInputProps(_props, 'bottom')} />
          <LengthInput {...getInputProps(_props, 'left')} />
          <LengthInput {...getInputProps(_props, 'borderRadius')} />
        </div>
      )
    }
    case 'circle': {
      const _props = props as EditorProps<Circle>
      return (
        <div>
          <LengthInput
            {...getInputProps(_props, 'radius')}
            keywords={['closest-side', 'farthest-side']}
          />
          <PositionInput {...getInputProps(_props, 'position')} />
        </div>
      )
    }
    case 'ellipse': {
      const _props = props as EditorProps<Ellipse>
      return (
        <div>
          <LengthInput
            {...getInputProps(_props, 'rx')}
            keywords={['closest-side', 'farthest-side']}
          />
          <LengthInput
            {...getInputProps(_props, 'ry')}
            keywords={['closest-side', 'farthest-side']}
          />

          <PositionInput {...getInputProps(_props, 'position')} />
        </div>
      )
    }
    case 'polygon': {
      const _props = props as EditorProps<Polygon>
      return (
        <div>
          <SelectInput
            {...getInputProps(_props, 'fillRule')}
            options={['nonzero', 'evenodd']}
          />
          <FieldArray
            {...getInputProps(_props, 'points')}
            stringify={stringifyBasicShape as any}
            content={PointInput}
            newItem={() =>
              [
                { value: 0, unit: 'px' },
                { value: 0, unit: 'px' },
              ] as [Length, Length]
            }
          />
        </div>
      )
    }
    case 'path': {
      const _props = props as EditorProps<Path>
      return (
        <div>
          <SelectInput
            {...getInputProps(_props, 'fillRule')}
            options={['nonzero', 'evenodd']}
          />
          <div>
            <Label>path</Label>
            <input
              type="text"
              value={_props.value.path}
              onChange={(e) =>
                _props.onChange({ ..._props.value, path: e.target.value })
              }
            />
          </div>
        </div>
      )
    }
  }
}

function PointInput(props: EditorPropsWithLabel<Point>) {
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <LengthInput percentage {...getInputProps(props, 0)} label="x" />
      <LengthInput percentage {...getInputProps(props, 1)} label="y" />
    </div>
  )
}
