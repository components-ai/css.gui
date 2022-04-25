import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../Layers'
import LayerHeader from '../LayerHeader'

import { Filter, Blur, DropShadow, HueRotate, AmountFilter } from './types'
import { stringifyFilter } from './stringify'
import { EditorProps } from '../editors/types'
import { getInputProps } from '../../lib/util'
import { SelectInput } from '../SelectInput'
import { NumberPercentageInput } from '../NumberPercentageInput'
import { AngleInput } from '../AngleInput'
import { ColorInput } from '../ColorInput'

export default function FilterContent({
  value,
  onChange,
}: EditorProps<Filter[]>) {
  const newItem = () => {
    return {
      type: 'blur',
      radius: { value: 0, unit: 'px' },
    } as const
  }
  return (
    <Layers<Filter>
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel="+ Add filter"
      header={Header}
      content={FilterEditor}
    />
  )
}

export const FilterEditor = (props: LayerProps<Filter>) => {
  return (
    <div>
      <SelectInput {...getInputProps(props, 'type')} options={filterTypes} />
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

export function Header({ value }: { value: Filter | Filter[] }) {
  const style = stringifyFilter(value)
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
