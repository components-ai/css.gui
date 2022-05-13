import { SelectInput } from '../SelectInput'
import { getInputProps } from '../../../lib/util'
import GradientStopsField from './stops'
import {
  ConicGradient,
  Gradient,
  LinearGradient,
  RadialGradient,
} from './types'
import { PositionInput } from '../PositionInput'
import { AngleInput } from '../AngleInput'
import { EditorProps } from '../../../types/editor'

const gradientTypeOptions = [
  'linear',
  'radial',
  'conic',
  'repeating-linear',
  'repeating-radial',
  'repeating-conic',
] as const
type GradientFieldProps = {
  value: Gradient
  onChange: (newValue: Gradient) => void
}
export const GradientField = (props: GradientFieldProps) => {
  return (
    <div>
      <div sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
        <SelectInput
          {...getInputProps(props, 'type')}
          options={gradientTypeOptions}
          onChange={(type) => {
            props.onChange({
              ...getDefaultGradient(type),
              // keep the stops of the current gradient when overriding
              stops: props.value.stops,
            })
          }}
        />
      </div>
      <GradientEditor {...props} />
      <div sx={{ mt: 3 }}>
        <GradientStopsField
          {...getInputProps(props, 'stops')}
          repeating={props.value.type?.startsWith('repeating-')}
        />
      </div>
    </div>
  )
}

export const GradientEditor = ({ value, ...props }: GradientFieldProps) => {
  switch (value.type) {
    case 'linear':
    case 'repeating-linear':
      return <LinearGradientEditor {...props} value={value as LinearGradient} />
    case 'radial':
    case 'repeating-radial':
      return <RadialGradientEditor {...props} value={value as RadialGradient} />
    case 'conic':
    case 'repeating-conic':
      return <ConicGradientEditor {...props} value={value as ConicGradient} />
    default:
      return null
  }
}

export const LinearGradientEditor = (props: EditorProps<LinearGradient>) => {
  return (
    <AngleInput
      {...getInputProps(props, 'angle')}
      keywords={[
        'to top',
        'to right',
        'to bottom',
        'to left',
        'to top left',
        'to top right',
        'to bottom right',
        'to bottom left',
      ]}
    />
  )
}

export const RadialGradientEditor = (props: EditorProps<RadialGradient>) => {
  return (
    <div>
      <div sx={{ display: 'flex' }}>
        <PositionInput {...getInputProps(props, 'position')} />
      </div>
      <div sx={{ display: 'flex' }}>
        <SelectInput
          {...getInputProps(props, 'shape')}
          options={['circle', 'ellipse']}
        />
      </div>
    </div>
  )
}

export const ConicGradientEditor = (props: EditorProps<ConicGradient>) => {
  return (
    <div>
      <div sx={{ display: 'flex' }}>
        <PositionInput {...getInputProps(props, 'position')} />
      </div>
      <AngleInput {...getInputProps(props, 'angle')} />
    </div>
  )
}

function getDefaultGradient(type: Gradient['type']): Gradient {
  switch (type) {
    case 'linear':
    case 'repeating-linear':
      return {
        type,
        angle: { value: 0, unit: 'deg' },
        stops: [],
      }
    case 'radial':
    case 'repeating-radial':
      return {
        type,
        shape: 'circle',
        position: {
          x: { value: 'center', unit: 'keyword' },
          y: { value: 'center', unit: 'keyword' },
        },
        stops: [],
      }
    case 'conic':
    case 'repeating-conic':
      return {
        type,
        angle: { value: 0, unit: 'deg' },
        position: {
          x: { value: 'center', unit: 'keyword' },
          y: { value: 'center', unit: 'keyword' },
        },
        stops: [],
      }
  }
}
