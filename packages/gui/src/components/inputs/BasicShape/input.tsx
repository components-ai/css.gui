import { getInputProps } from '../../../lib/util'
import { EditorProps, EditorPropsWithLabel } from '../../../types/editor'
import FieldArray from '../../FieldArray'
import { Label } from '../../primitives'
import { LengthInput } from '../LengthInput'
import { PositionInput } from '../PositionInput'
import { SelectInput } from '../SelectInput'
import { stringifyBasicShape } from './stringify'
import {
  BasicShape,
  BasicShapeType,
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
        onChange={(type) => props.onChange(getDefaultBasicShape(type))}
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
          <LengthInput percentage {...getInputProps(_props, 'top')} />
          <LengthInput percentage {...getInputProps(_props, 'right')} />
          <LengthInput percentage {...getInputProps(_props, 'bottom')} />
          <LengthInput percentage {...getInputProps(_props, 'left')} />
          <LengthInput percentage {...getInputProps(_props, 'borderRadius')} />
        </div>
      )
    }
    case 'circle': {
      const _props = props as EditorProps<Circle>
      return (
        <div>
          <LengthInput
            percentage
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
            percentage
            {...getInputProps(_props, 'rx')}
            keywords={['closest-side', 'farthest-side']}
          />
          <LengthInput
            percentage
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
            newItem={() => ({
              x: { value: 0, unit: 'px' },
              y: { value: 0, unit: 'px' },
            })}
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
      <LengthInput percentage {...getInputProps(props, 'x')} />
      <LengthInput percentage {...getInputProps(props, 'y')} />
    </div>
  )
}

export function getDefaultBasicShape(type: BasicShapeType): BasicShape {
  switch (type) {
    case 'inset': {
      return {
        type,
        top: { value: 0, unit: 'px' },
        right: { value: 0, unit: 'px' },
        bottom: { value: 0, unit: 'px' },
        left: { value: 0, unit: 'px' },
        borderRadius: { value: 0, unit: 'px' },
      }
    }
    case 'circle': {
      return {
        type,
        radius: { value: 'closest-side', unit: 'keyword' },
        position: {
          x: { value: 'center', unit: 'keyword' },
          y: { value: 'center', unit: 'keyword' },
        },
      }
    }
    case 'ellipse': {
      return {
        type,
        rx: { value: 'closest-side', unit: 'keyword' },
        ry: { value: 'closest-side', unit: 'keyword' },
        position: {
          x: { value: 'center', unit: 'keyword' },
          y: { value: 'center', unit: 'keyword' },
        },
      }
    }
    case 'polygon': {
      return {
        type,
        fillRule: 'nonzero',
        points: [
          {
            x: { value: 0, unit: '%' },
            y: { value: 0, unit: '%' },
          },
          {
            x: { value: 100, unit: '%' },
            y: { value: 0, unit: '%' },
          },
          {
            x: { value: 100, unit: '%' },
            y: { value: 100, unit: '%' },
          },
          {
            x: { value: 0, unit: '%' },
            y: { value: 100, unit: '%' },
          },
        ],
      }
    }
    case 'path': {
      return {
        type,
        fillRule: 'nonzero',
        path: '',
      }
    }
  }
}
