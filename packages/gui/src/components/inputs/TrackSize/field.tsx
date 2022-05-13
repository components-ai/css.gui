import { getInputProps } from '../../../lib/util'
import { EditorProps, EditorPropsWithLabel } from '../../../types/editor'
import Layers from '../../Layers'
import { LengthInput } from '../LengthInput'
import { SelectInput } from '../SelectInput'
import { stringifyTrackSizeList } from './stringify'
import { FitContent, MinMax, TrackBreadth, TrackSize } from './types'

export default function TrackSizeListInput(
  props: EditorPropsWithLabel<TrackSize[]>
) {
  const addItem = () => {
    return {
      type: 'breadth',
      value: { value: 1, unit: 'fr' },
    } as const
  }
  return (
    <Layers
      {...props}
      stringify={stringifyTrackSizeList}
      newItem={addItem}
      content={TrackSizeInput}
    />
  )
}

function TrackSizeInput(props: EditorProps<TrackSize>) {
  return (
    <div>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={['breadth', 'minmax', 'fit-content']}
        onChange={(type) => props.onChange(getDefaultTrackSizeValue(type))}
      />
      <TrackSizeSwitch {...props} />
    </div>
  )
}

export function TrackSizeSwitch(props: EditorProps<TrackSize>) {
  switch (props.value.type) {
    case 'breadth': {
      const _props = props as EditorProps<TrackBreadth>
      return (
        <LengthInput
          percentage
          flex
          {...getInputProps(_props, 'value')}
          keywords={trackKeywords}
        />
      )
    }
    case 'minmax': {
      const _props = props as EditorProps<MinMax>
      return (
        <div>
          <LengthInput
            percentage
            {...getInputProps(_props, 'min')}
            keywords={trackKeywords}
          />
          <LengthInput
            percentage
            flex
            {...getInputProps(_props, 'max')}
            keywords={trackKeywords}
          />
        </div>
      )
    }
    case 'fit-content': {
      const _props = props as EditorProps<FitContent>
      return <LengthInput percentage {...getInputProps(_props, 'value')} />
    }
  }
}

const trackKeywords = ['min-content', 'max-content', 'auto']

export function getDefaultTrackSizeValue(type: TrackSize['type']): TrackSize {
  switch (type) {
    case 'breadth':
      return { type, value: { value: 1, unit: 'fr' } }
    case 'minmax':
      return {
        type,
        min: { value: 20, unit: 'px' },
        max: { value: 1, unit: 'fr' },
      }
    case 'fit-content':
      return {
        type,
        value: { value: 100, unit: '%' },
      }
  }
}
