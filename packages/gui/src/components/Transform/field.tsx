import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../Layers'
import LayerHeader from '../LayerHeader'

import {
  Perspective,
  Rotate,
  Rotate3D,
  Transform,
  TransformType,
} from './types'
import { EditorProps } from '../editors/types'
import { getInputProps } from '../../lib/util'
import { SelectInput } from '../SelectInput'
import { NumberPercentageInput } from '../NumberPercentageInput'
import { AngleInput } from '../AngleInput'
import { ColorInput } from '../ColorInput'
import { stringifyTransform } from './stringify'
import { Angle, Length } from '../../types/css'

export default function TransformContent({
  value,
  onChange,
}: EditorProps<Transform[]>) {
  const newItem = () => {
    return getDefault('matrix')
  }
  return (
    <Layers<Transform>
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel="+ Add filter"
      header={Header}
      content={TransformEditor}
    />
  )
}

export const TransformEditor = (props: LayerProps<Transform>) => {
  return (
    <div>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={filterTypes}
        onChange={(newType) => {
          props.onChange(convertTransformValue(props.value, newType))
        }}
      />
      <TransformSwitch {...props} />
    </div>
  )
}

const filterTypes = [
  'matrix',
  'matrix3d',
  'perspective',
  'rotate',
  'rotate3d',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scale3d',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skew',
  'skewX',
  'skewY',
  'translate',
  'translate3d',
  'translateX',
  'translateY',
  'translateZ',
] as const

function TransformSwitch(props: LayerProps<Transform>) {
  switch (props.value.type) {
    case 'perspective': {
      return (
        <LengthInput
          {...getInputProps(props as EditorProps<Perspective>, 'd')}
        />
      )
    }
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ': {
      const _props = props as EditorProps<Rotate>
      return <AngleInput {...getInputProps(_props, 'a')} />
    }
    case 'rotate3d': {
      const _props = props as EditorProps<Rotate3D>
      return (
        <>
          <AngleInput {...getInputProps(_props, 'a')} />
        </>
      )
    }
  }
  return null
}

export function Header({ value }: { value: Transform | Transform[] }) {
  const style = stringifyTransform(value)
  return (
    <LayerHeader
      text={style}
      preview={
        <div
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            sx={{
              width: '1rem',
              height: '1rem',
              filter: style,
              borderRadius: '9999px',
              backgroundImage:
                'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
            }}
          />
        </div>
      }
    />
  )
}

function convertTransformValue(
  value: Transform,
  newType: TransformType
): Transform {
  //   if (value.type === newType) {
  //     return value
  //   }

  //   // // When converting between two values that take a number-percentage amount
  //   // // keep the amount
  //   // if (isAmountFilter(value.type) && isAmountFilter(newType)) {
  //   //   return { ...value, type: newType } as any
  //   // }

  //   // Otherwise, reset to the default of that filter type
  return getDefault(newType)
}

function getDefault(type: TransformType): Transform {
  switch (type) {
    case 'matrix':
      return { type, a: 0, b: 0, c: 0, d: 0, tx: 0, ty: 0 }
    case 'matrix3d':
      return { type, values: [...Array(16)].map((x) => 0) }
    case 'perspective':
      return { type, d: ZERO }
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
      return { type, a: ZERO_DEG }
    case 'rotate3d':
      return { type, a: ZERO_DEG, x: 0, y: 0, z: 0 }
    case 'scale':
    case 'scale3d':
    case 'scaleX':
    case 'scaleY':
    case 'scaleZ':
      return { type, sx: 0, sy: 0, sz: 0 }
    case 'skew':
    case 'skewX':
    case 'skewY':
      return { type, ax: ZERO_DEG, ay: ZERO_DEG }
    case 'translate':
    case 'translate3d':
    case 'translateX':
    case 'translateY':
    case 'translateZ':
      return { type, tx: ZERO, ty: ZERO, tz: ZERO }
  }
  // return { type: 'perspective', value: undefined }
}

const ZERO: Length = { value: 0, unit: 'px' }
const ZERO_DEG: Angle = { value: 0, unit: 'deg' }
