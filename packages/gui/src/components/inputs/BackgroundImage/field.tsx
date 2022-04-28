import Layers, { LayerProps } from '../../Layers'
import LayerHeader from '../../LayerHeader'
import { BackgroundImage, BackgroundImageType } from './types'
import { EditorProps } from '../../../types/editor'
import { getInputProps } from '../../../lib/util'
import { SelectInput } from '../SelectInput'
import { stringifyBackgroundImage } from './stringify'
import { URLInput } from '../../primitives/URLInput'
import produce from 'immer'
import GradientPicker from '../Gradient/picker'
import { GradientList } from '../Gradient/types'

const DEFAULT_IMAGE_URL = 'https://mrmrs.s3.us-west-2.amazonaws.com/plot-1.jpg'
export default function FilterContent({
  value,
  onChange,
}: EditorProps<BackgroundImage[]>) {
  const newItem = () => {
    return getDefault('url')
  }

  return (
    <Layers<BackgroundImage>
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel="+ Add background image"
      header={Header}
      content={BackgroundEditor}
    />
  )
}

export const BackgroundEditor = (props: LayerProps<BackgroundImage>) => {
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
        <GradientPicker
          value={props.value.gradient}
          onChange={(newGradient: GradientList) => {
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

export function Header({
  value,
}: {
  value: BackgroundImage | BackgroundImage[]
}) {
  const style = stringifyBackgroundImage(value)
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
  value: BackgroundImage,
  newType: BackgroundImageType
): BackgroundImage {
  if (value.type === newType) {
    return value
  }

  // Otherwise, reset to the default of that filter type
  return getDefault(newType)
}

function getDefault(type: BackgroundImageType): BackgroundImage {
  switch (type) {
    case 'gradient':
      return { type, gradient: [] }
    case 'url':
    default:
      return { type: 'url', arguments: [DEFAULT_IMAGE_URL] }
  }
}
