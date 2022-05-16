import { getInputProps } from '../../../lib/util'
import { EditorProps, EditorPropsWithLabel } from '../../../types/editor'
import Layers from '../../Layers'
import { NumberInput } from '../NumberInput'
import { SelectInput } from '../SelectInput'
import TrackSizeListInput, {
  getDefaultTrackSizeValue,
  TrackSizeSwitch,
} from '../TrackSize/field'
import { TrackSize } from '../TrackSize/types'
import { stringifyGridTrackList } from './stringify'
import { GridTrack, TrackRepeat } from './types'

export default function GridTrackListInput(
  props: EditorPropsWithLabel<GridTrack[]>
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
      stringify={stringifyGridTrackList}
      newItem={addItem}
      content={GridTrackInput}
    />
  )
}

function GridTrackInput(props: EditorProps<GridTrack>) {
  return (
    <div sx={{ m: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SelectInput
        {...getInputProps(props, 'type')}
        options={['breadth', 'minmax', 'fit-content', 'repeat']}
        onChange={(type) => props.onChange(getDefaultGridTrackValue(type))}
      />
      <GridTrackSwitch {...props} />
    </div>
  )
}

function GridTrackSwitch(props: EditorProps<GridTrack>) {
  switch (props.value.type) {
    case 'repeat': {
      const _props = props as EditorProps<TrackRepeat>
      return <TrackRepeatInput {..._props} />
    }
    default: {
      const _props = props as EditorProps<TrackSize>
      return <TrackSizeSwitch {..._props} />
    }
  }
}

function TrackRepeatInput(props: EditorProps<TrackRepeat>) {
  return (
    <div sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <NumberInput {...getInputProps(props, 'count')} min={0} />
      <TrackSizeListInput {...getInputProps(props, 'trackList')} />
    </div>
  )
}

function getDefaultGridTrackValue(type: GridTrack['type']): GridTrack {
  switch (type) {
    case 'repeat': {
      return {
        type,
        count: 1,
        trackList: [{ type: 'breadth', value: { value: 1, unit: 'fr' } }],
      }
    }
    default:
      return getDefaultTrackSizeValue(type)
  }
}
