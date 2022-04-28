import { LengthInput } from '../../LengthInput'
import Layers, { LayerProps } from '../../../Layers'
import LayerHeader from '../../../LayerHeader'

import {
  Matrix,
  Perspective,
  Rotate,
  Rotate3D,
  Scale,
  Skew,
  Transform,
  TransformType,
  Translate,
} from './types'
import { EditorProps } from '../../../../types/editor'
import {
  EditorPropsWithLabel,
  getInputProps as _getInputProps,
} from '../../../../lib/util'
import { SelectInput } from '../../SelectInput'
import { AngleInput } from '../../AngleInput'
import { stringifyTransform } from './stringify'
import { Angle, Length } from '../../../../types/css'
import { NumberInput } from '../../NumberInput'
import { range } from 'lodash-es'

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
    case 'matrix': {
      const _props = props as EditorProps<Matrix>

      return (
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {(['a', 'c', 'tx', 'b', 'd', 'ty'] as const).map((item) => {
            return <IncNumberInput {...getInputProps(_props, item)} />
          })}{' '}
        </div>
      )
    }
    case 'matrix3d': {
      const { value, onChange } = props
      const { values } = value
      return (
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {range(0, 4).flatMap((i) => {
            return range(0, 4).map((j) => {
              const index = j * 4 + i
              const label = `${'abcd'[j]}${i}`
              return (
                <IncNumberInput
                  label={label}
                  value={values[index]}
                  onChange={(newValue) => {
                    const copy = [...values]
                    copy.splice(index, 1, newValue)
                    onChange({ ...value, values: copy })
                  }}
                />
              )
            })
          })}
        </div>
      )
    }
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
          <IncNumberInput {...getInputProps(_props, 'x')} />
          <IncNumberInput {...getInputProps(_props, 'y')} />
          <IncNumberInput {...getInputProps(_props, 'z')} />
        </>
      )
    }
    case 'scale': {
      const _props = props as EditorProps<Scale>
      return (
        <>
          <IncNumberInput {...getInputProps(_props, 'sx')} />
          <IncNumberInput {...getInputProps(_props, 'sy')} />
        </>
      )
    }
    case 'scale3d': {
      const _props = props as EditorProps<Scale>
      return (
        <>
          <IncNumberInput {...getInputProps(_props, 'sx')} />
          <IncNumberInput {...getInputProps(_props, 'sy')} />
          <IncNumberInput {...getInputProps(_props, 'sz')} />
        </>
      )
    }
    case 'scaleX': {
      const _props = props as EditorProps<Scale>
      return <IncNumberInput {...getInputProps(_props, 'sx')} />
    }
    case 'scaleY': {
      const _props = props as EditorProps<Scale>
      return <IncNumberInput {...getInputProps(_props, 'sy')} />
    }
    case 'scaleZ': {
      const _props = props as EditorProps<Scale>
      return <IncNumberInput {...getInputProps(_props, 'sz')} />
    }
    case 'skew': {
      const _props = props as EditorProps<Skew>
      return (
        <>
          <AngleInput {...getInputProps(_props, 'ax')} />
          <AngleInput {...getInputProps(_props, 'ay')} />
        </>
      )
    }
    case 'skewX': {
      const _props = props as EditorProps<Skew>
      return <AngleInput {...getInputProps(_props, 'ax')} />
    }
    case 'skewY': {
      const _props = props as EditorProps<Skew>
      return <AngleInput {...getInputProps(_props, 'ay')} />
    }
    case 'translate': {
      const _props = props as EditorProps<Translate>
      return (
        <>
          <LengthInput percentage {...getInputProps(_props, 'tx')} />
          <LengthInput percentage {...getInputProps(_props, 'ty')} />
        </>
      )
    }
    case 'translate3d': {
      const _props = props as EditorProps<Translate>
      return (
        <>
          <LengthInput percentage {...getInputProps(_props, 'tx')} />
          <LengthInput percentage {...getInputProps(_props, 'ty')} />
          <LengthInput {...getInputProps(_props, 'tz')} />
        </>
      )
    }
    case 'translateX': {
      const _props = props as EditorProps<Translate>
      return <LengthInput percentage {...getInputProps(_props, 'tx')} />
    }
    case 'translateY': {
      const _props = props as EditorProps<Translate>
      return <LengthInput percentage {...getInputProps(_props, 'ty')} />
    }
    case 'translateZ': {
      const _props = props as EditorProps<Translate>
      return <LengthInput {...getInputProps(_props, 'tz')} />
    }
  }
  return null
}

function getInputProps<T extends object, K extends keyof T>(
  props: EditorProps<T>,
  property: K
): EditorPropsWithLabel<T[typeof property]> {
  return {
    ..._getInputProps(props, property),
    label: '' + property, // don't capitalize label
  }
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
              transform: style,
              backgroundColor: '#f00',
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
  // TODO handle transforms between different values
  return getDefault(newType)
}

function getDefault(type: TransformType): Transform {
  switch (type) {
    case 'matrix':
      return { type, a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }
    case 'matrix3d':
      const values = [...Array(16)].map((x) => 0)
      values[0] = 1
      values[5] = 1
      values[10] = 1
      values[15] = 1
      return { type, values }
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
}

const ZERO: Length = { value: 0, unit: 'px' }
const ZERO_DEG: Angle = { value: 0, unit: 'deg' }

// Override the number input with more incremental steps for this one
function IncNumberInput(props: Parameters<typeof NumberInput>[0]) {
  return <NumberInput {...props} step={0.1} />
}
