import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../Layers'
import LayerHeader from '../LayerHeader'

import { CSSFilter } from './types'
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
}: EditorProps<CSSFilter[]>) {
  const newItem = () => {
    return {
      type: 'blur',
      radius: { value: 0, unit: 'px' },
    } as const
  }
  return (
    <Layers<CSSFilter>
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel="+ Add box shadow"
      header={Header}
      content={FilterEditor}
    />
  )
}

export const FilterEditor = (props: LayerProps<CSSFilter>) => {
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

function FilterSwitch(props: LayerProps<CSSFilter>) {
  switch (props.value.type) {
    case 'blur':
      return <LengthInput {...getInputProps(props, 'radius' as any)} />
    case 'drop-shadow':
      return (
        <div>
          <LengthInput {...getInputProps(props, 'offsetX' as any)} />
          <LengthInput {...getInputProps(props, 'offsetY' as any)} />
          <LengthInput {...getInputProps(props, 'blurRadius' as any)} />
          <ColorInput {...getInputProps(props, 'color' as any)} />
        </div>
      )
    case 'hue-rotate':
      return <AngleInput {...getInputProps(props, 'angle' as any)} />
    default:
      // TODO some of the filters have different boundaries
      return (
        <NumberPercentageInput {...getInputProps(props, 'amount' as any)} />
      )
  }
}

export function Header({ value }: { value: CSSFilter | CSSFilter[] }) {
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
          <div sx={{ width: '1rem', height: '1rem', boxShadow: style }} />
        </div>
      }
    />
  )
}
