import { SelectInput } from '../SelectInput'
import { getInputProps } from '../../../lib/util'
import { NumberInput } from '../NumberInput'
import GradientStopsField from './stops'
import {
  ConicGradient,
  Gradient,
  LinearGradient,
  RadialGradient,
} from './types'

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

type RadialGradientEditorProps = {
  value: RadialGradient
  onChange: (newValue: RadialGradient) => void
}
export const RadialGradientEditor = (props: RadialGradientEditorProps) => {
  return (
    <div>
      <div sx={{ display: 'flex' }}>
        <div sx={{ width: '50%', pr: 1 }}>
          <NumberInput
            {...getInputProps(props, 'locationX')}
            label="X"
            min={-200}
            max={200}
          />
        </div>
        <div sx={{ width: '50%', pl: 1 }}>
          <NumberInput
            {...getInputProps(props, 'locationY')}
            label="Y"
            min={-200}
            max={200}
          />
        </div>
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

type ConicGradientEditorProps = {
  value: ConicGradient
  onChange: (newValue: ConicGradient) => void
}
export const ConicGradientEditor = (props: ConicGradientEditorProps) => {
  return (
    <div>
      <div sx={{ display: 'flex' }}>
        <div sx={{ width: '50%', pr: 1 }}>
          <NumberInput
            {...getInputProps(props, 'locationX')}
            label="X"
            min={-200}
            max={200}
          />
        </div>
        <div sx={{ width: '50%', pl: 1 }}>
          <NumberInput
            {...getInputProps(props, 'locationY')}
            label="Y"
            min={-200}
            max={200}
          />
        </div>
      </div>
      <NumberInput {...getInputProps(props, 'degrees')} min={0} max={360} />
    </div>
  )
}

type LinearGradientEditorProps = {
  value: LinearGradient
  onChange: (newValue: LinearGradient) => void
}
export const LinearGradientEditor = (props: LinearGradientEditorProps) => {
  return <NumberInput {...getInputProps(props, 'degrees')} min={0} max={360} />
}
