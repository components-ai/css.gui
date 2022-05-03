import Layers, { LayerProps } from '../../Layers'
import LayerHeader from '../../LayerHeader'
import { ImageSource, ImageSourceType } from './types'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { SelectInput } from '../SelectInput'
import { stringifyImageSource } from './stringify'
import { URLInput } from '../../primitives/URLInput'
import produce from 'immer'
import { GradientField } from '../Gradient/field'

const DEFAULT_IMAGE_URL = ''
export default function ImageSourceContent({
  label,
  value,
  onChange,
}: EditorPropsWithLabel<ImageSource[]>) {
  const newItem = () => {
    return getDefault('url')
  }

  return (
    <Layers<ImageSource>
      label={label}
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel={`+ Add ${label}`}
      header={Header}
      content={ImageSourceEditor}
    />
  )
}

export const ImageSourceEditor = (props: LayerProps<ImageSource>) => {
  return (
    <div sx={{ px: 3, pb: 3, pt: 2 }}>
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

export function Header({ value }: { value: ImageSource | ImageSource[] }) {
  const style = stringifyImageSource(value)
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
              backgroundImage: style,
            }}
          />
        </div>
      }
    />
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
      return { type, gradient: { type: 'linear', degrees: 0, stops: [] } }
    case 'url':
    default:
      return { type: 'url', arguments: [DEFAULT_IMAGE_URL] }
  }
}
