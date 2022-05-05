import { EditorProps } from '../../../types/editor'
import {
  attachmentKeywords,
  Background,
  boxKeywords,
  repeatKeywords,
  RepeatStyle,
} from './types'

import { stringifyBackgroundList } from './stringify'

import Layers from '../../Layers'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { ImageSourceEditor } from '../ImageSource/field'
import { PositionInput } from '../PositionInput'
import { Label } from '../../primitives'
import { SelectInput } from '../SelectInput'
import { BgSizeInput } from '../BgSizeInput'

export default function BackgroundInput(
  props: EditorPropsWithLabel<Background[]>
) {
  const newItem = () => {
    // generate a new text shadow with the units of the previous box shadow
    return {
      attachment: 'scroll',
      clip: 'border-box',
      image: {
        type: 'gradient',
        gradient: {
          type: 'linear',
          degrees: 0,
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
    } as any
  }
  return (
    <Layers<Background>
      {...props}
      newItem={newItem}
      content={BackgroundLayer}
      stringify={stringifyBackgroundList}
      thumbnail={Thumbnail}
    />
  )
}

export const BackgroundLayer = (props: EditorProps<Background>) => {
  return (
    <div sx={{ m: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ImageSourceEditor {...getInputProps(props, 'image')} />
      <PositionInput {...getInputProps(props, 'position')} />
      <BgSizeInput {...getInputProps(props, 'size')} />
      <RepeatStyleInput {...getInputProps(props, 'repeat')} />
      <SelectInput
        {...getInputProps(props, 'attachment')}
        options={attachmentKeywords}
      />
      <SelectInput {...getInputProps(props, 'origin')} options={boxKeywords} />
      <SelectInput
        {...getInputProps(props, 'clip')}
        options={[...boxKeywords, 'text']}
      />
    </div>
  )
}

export function RepeatStyleInput(props: EditorPropsWithLabel<RepeatStyle>) {
  return (
    <div>
      <Label>Repeat</Label>
      <div
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}
      >
        <SelectInput {...getInputProps(props, 'x')} options={repeatKeywords} />
        <SelectInput {...getInputProps(props, 'y')} options={repeatKeywords} />
      </div>
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
        background: value,
      }}
    ></div>
  )
}
