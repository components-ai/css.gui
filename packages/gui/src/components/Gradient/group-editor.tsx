import { SelectInput } from '../SelectInput'
import { getInputProps } from '../../lib/util'
import { NumberInput } from '../NumberInput'
import GradientStopsField from './stops'

export const GradientEditor = (props: any) => {
  return (
    <div sx={{ m: 0 }}>
      <div sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
        <SelectInput
          {...getInputProps(props, 'type')}
          options={[
            'linear',
            'radial',
            'conic',
            'repeating-linear',
            'repeating-radial',
            'repeating-conic',
          ]}
        />
      </div>
      <Gradient {...props} />

      {/** 
      <div sx={{ mt: 3 }}>
        <GradientStopsField
          {...getInputProps(props, 'stops')}
          repeating={props.value.type?.startsWith('repeating-')}
        />
      </div>
      */}
    </div>
  )
}

export const Gradient = (props: any) => {
  const type = props.value.type
  switch (type) {
    case 'linear':
    case 'repeating-linear':
      return <LinearGradient {...props} />
    case 'radial':
    case 'repeating-radial':
      return <RadialGradient {...props} />
    case 'conic':
    case 'repeating-conic':
      return <ConicGradient {...props} />
    default:
      return null
  }
}

export const RadialGradient = (props: any) => {
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

export const ConicGradient = (props: any) => {
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

export const LinearGradient = (props: any) => {
  return <NumberInput {...getInputProps(props, 'degrees')} min={0} max={360} />
}
