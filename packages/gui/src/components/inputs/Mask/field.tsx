import { EditorProps } from '../../../types/editor'

import { stringifyMaskList } from './stringify'

import Layers from '../../Layers'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { ImageSourceEditor } from '../ImageSource/field'
import { PositionInput } from '../PositionInput'
import { SelectInput } from '../SelectInput'
import { Mask, compositingOperators, maskingModes } from './types'
import { RepeatStyleInput } from '../Background/field'
import { BgSizeInput } from '../BgSizeInput'
import { GEOMETRY_BOX_KEYWORDS } from '../../../types/css'

export default function MaskInput(props: EditorPropsWithLabel<Mask[]>) {
  const newItem = () => {
    // generate a new text shadow with the units of the previous box shadow
    return {
      clip: 'border-box',
      image: {
        type: 'gradient',
        gradient: {
          type: 'linear',
          angle: { value: 0, unit: 'deg' },
          stops: [],
        },
      },
      origin: 'border-box',
      position: {
        x: { value: 0, unit: 'px' },
        y: { value: 0, unit: 'px' },
      },
      repeat: {
        x: 'no-repeat',
        y: 'no-repeat',
      },
      size: {
        x: { value: 100, unit: '%' },
        y: { value: 100, unit: '%' },
      },
      composite: 'add',
      mode: 'alpha',
    } as any
  }
  return (
    <Layers<Mask>
      {...props}
      newItem={newItem}
      content={MaskLayer}
      stringify={stringifyMaskList}
      thumbnail={Thumbnail}
    />
  )
}

export const MaskLayer = (props: EditorProps<Mask>) => {
  return (
    <div sx={{ m: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ImageSourceEditor {...getInputProps(props, 'image')} />
      <PositionInput {...getInputProps(props, 'position')} />
      <BgSizeInput {...getInputProps(props, 'size')} />
      <RepeatStyleInput {...getInputProps(props, 'repeat')} />
      <SelectInput
        {...getInputProps(props, 'origin')}
        options={GEOMETRY_BOX_KEYWORDS}
      />
      <SelectInput
        {...getInputProps(props, 'clip')}
        options={[...GEOMETRY_BOX_KEYWORDS, 'no-clip']}
      />
      <SelectInput
        {...getInputProps(props, 'composite')}
        options={compositingOperators}
      />
      <SelectInput {...getInputProps(props, 'mode')} options={maskingModes} />
    </div>
  )
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
        mask: value,
        backgroundImage:
          'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
      }}
    ></div>
  )
}
