import { stringifyValues } from '../../lib/stringify'
import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { ShapeBox, SHAPE_BOX_KEYWORDS } from '../../types/css'
import { EditorProps } from '../../types/editor'
import { Label } from '../primitives'
import { BasicShapeInput, getDefaultBasicShape } from './BasicShape/input'
import { stringifyBasicShape } from './BasicShape/stringify'
import { BasicShape } from './BasicShape/types'
import { ImageSourceEditor } from './ImageSource/field'
import { stringifyImageSource } from './ImageSource/stringify'
import { ImageSource } from './ImageSource/types'
import { SelectInput } from './SelectInput'

type ShapeOutside = Image | Shape

interface Image {
  type: 'image'
  image: ImageSource
}

interface Shape {
  type: 'shape'
  shape: BasicShape
  box: ShapeBox
}

export function ShapeOutsideInput(props: EditorPropsWithLabel<ShapeOutside>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={['image', 'shape']}
        onChange={(type) => props.onChange(getDefaultValue(type))}
      />
      <ShapeOutsideSwitch {...props} />
    </div>
  )
}

function ShapeOutsideSwitch(props: EditorProps<ShapeOutside>) {
  switch (props.value.type) {
    case 'image': {
      const _props = props as EditorProps<Image>
      return <ImageSourceEditor {...getInputProps(_props, 'image')} />
    }
    case 'shape': {
      const _props = props as EditorProps<Shape>
      return (
        <div>
          <BasicShapeInput {...getInputProps(_props, 'shape')} />
          <SelectInput
            {...getInputProps(_props, 'box')}
            options={SHAPE_BOX_KEYWORDS}
          />
        </div>
      )
    }
  }
}

export function stringifyShapeOutside(value: ShapeOutside) {
  switch (value.type) {
    case 'image': {
      return stringifyImageSource(value.image)
    }
    case 'shape': {
      return stringifyValues([stringifyBasicShape(value.shape), value.box])
    }
  }
}

function getDefaultValue(type: 'image' | 'shape'): ShapeOutside {
  switch (type) {
    case 'image': {
      return {
        type,
        image: {
          type: 'gradient',
          gradient: {
            type: 'linear',
            degrees: { value: 0, unit: 'deg' },
            stops: [
              { hinting: 0, color: 'black' },
              { hinting: 100, color: 'transparent' },
            ],
          },
        },
      }
    }
    case 'shape': {
      return {
        type,
        shape: getDefaultBasicShape('inset'),
        box: 'content-box',
      }
    }
  }
}
