import Layers, { LayerProps } from '../../Layers'
import { ImageSource, ImageSourceType } from './types'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { SelectInput } from '../SelectInput'
import { stringifyImageSource } from './stringify'
import { URLInput } from '../../primitives/URLInput'
import produce from 'immer'
import { GradientField } from '../Gradient/field'

const DEFAULT_IMAGE_URL = ''
export default function ImageSourceInput(
  props: EditorPropsWithLabel<ImageSource[]>
) {
  const newItem = () => {
    return getDefault('url')
  }

  return (
    <Layers<ImageSource>
      {...props}
      newItem={newItem}
      content={ImageSourceEditor}
      stringify={stringifyImageSource}
      thumbnail={Thumbnail}
    />
  )
}

export const ImageSourceEditor = (props: LayerProps<ImageSource>) => {
  return (
    <div>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={['url', 'gradient']}
        onChange={(newType) => {
          props.onChange(convertBackgroundImageValue(props.value, newType))
        }}
      />
      {props.value.type === 'url' ? (
        <URLInput
          value={props.value.arguments[0]}
          onChange={(newUrl: string) => {
            const newValue = produce(props.value, (draft: any) => {
              draft.arguments[0] = newUrl
            })
            props.onChange(newValue)
          }}
        />
      ) : (
        <GradientField
          value={props.value.gradient}
          onChange={(newGradient) => {
            const newValue = produce(props.value, (draft: any) => {
              draft.gradient = newGradient
            })
            props.onChange(newValue)
          }}
        />
      )}
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
      }}
    >
      <div
        sx={{
          width: '1rem',
          height: '1rem',
          borderRadius: '9999px',
          backgroundImage: value,
        }}
      />
    </div>
  )
}

function convertBackgroundImageValue(
  value: ImageSource,
  newType: ImageSourceType
): ImageSource {
  if (value.type === newType) {
    return value
  }

  // Otherwise, reset to the default of that filter type
  return getDefault(newType)
}

function getDefault(type: ImageSourceType): ImageSource {
  switch (type) {
    case 'gradient':
      return {
        type,
        gradient: {
          type: 'linear',
          angle: { value: 0, unit: 'deg' },
          stops: [],
        },
      }
    case 'url':
    default:
      return { type: 'url', arguments: [DEFAULT_IMAGE_URL] }
  }
}
