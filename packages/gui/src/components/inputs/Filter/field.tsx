import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../../Layers'

import {
  Filter,
  FilterType,
  Blur,
  DropShadow,
  HueRotate,
  AmountFilter,
} from './types'
import { stringifyFilter } from './stringify'
import { EditorProps } from '../../../types/editor'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { SelectInput } from '../SelectInput'
import { NumberPercentageInput } from '../NumberPercentageInput'
import { AngleInput } from '../AngleInput'
import { ColorInput } from '../ColorInput'

export default function FilterInput(props: EditorPropsWithLabel<Filter[]>) {
  const newItem = () => {
    return getDefault('blur')
  }
  return (
    <Layers<Filter>
      {...props}
      newItem={newItem}
      stringify={stringifyFilter}
      content={FilterEditor}
      thumbnail={Thumbnail}
    />
  )
}

export const FilterEditor = (props: LayerProps<Filter>) => {
  return (
    <div sx={{ m: 3 }}>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={filterTypes}
        onChange={(newType) => {
          props.onChange(convertFilterValue(props.value, newType))
        }}
      />
      <FilterSwitch {...props} />
    </div>
  )
}

const filterTypes = [
  'blur',
  'brightness',
  'contrast',
  'drop-shadow',
  'grayscale',
  'hue-rotate',
  'invert',
  'opacity',
  'saturate',
  'sepia',
] as const

function FilterSwitch(props: LayerProps<Filter>) {
  switch (props.value.type) {
    case 'blur': {
      const _props = props as EditorProps<Blur>
      return <LengthInput {...getInputProps(_props, 'radius')} />
    }
    case 'drop-shadow': {
      const _props = props as EditorProps<DropShadow>
      return (
        <div>
          <LengthInput {...getInputProps(_props, 'offsetX')} />
          <LengthInput {...getInputProps(_props, 'offsetY')} />
          <LengthInput {...getInputProps(_props, 'blurRadius')} />
          <ColorInput {...getInputProps(_props, 'color')} />
        </div>
      )
    }
    case 'hue-rotate': {
      const _props = props as EditorProps<HueRotate>
      return <AngleInput {...getInputProps(_props, 'angle')} />
    }
    default: {
      const _props = props as EditorProps<AmountFilter>
      // TODO some of the filters have different boundaries
      return <NumberPercentageInput {...getInputProps(_props, 'amount')} />
    }
  }
}
function Thumbnail({ value }: { value: string }) {
  return (
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
          filter: value,
          borderRadius: '9999px',
          backgroundImage:
            'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
        }}
      />
    </div>
  )
}

function convertFilterValue(value: Filter, newType: FilterType): Filter {
  if (value.type === newType) {
    return value
  }

  // When converting between two values that take a number-percentage amount
  // keep the amount
  if (isAmountFilter(value.type) && isAmountFilter(newType)) {
    return { ...value, type: newType } as any
  }

  // Otherwise, reset to the default of that filter type
  return getDefault(newType)
}

function getDefault(type: FilterType): Filter {
  switch (type) {
    case 'hue-rotate':
      return { type, angle: { value: 0, unit: 'deg' } }
    case 'blur':
      return { type, radius: { value: 0, unit: 'px' } }
    case 'drop-shadow':
      return {
        type,
        offsetX: { value: 0, unit: 'px' },
        offsetY: { value: 0, unit: 'px' },
        blurRadius: { value: 0, unit: 'px' },
        color: '#000',
      }
    default:
      return { type, amount: { value: 0, unit: 'number' } }
  }
}

function isAmountFilter(type: FilterType) {
  return !['hue-rotate', 'blur', 'drop-shadow'].includes(type)
}
