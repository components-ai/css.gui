import Layers, { LayerProps } from '../../Layers'
import {
  Animation,
  animationDirections,
  animationFillModes,
  animationPlayStates,
} from './types'
import { stringifyAnimationList } from './stringify'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'
import { SelectInput } from '../SelectInput'
import { TimeInput } from '../TimeInput'
import { EasingFunctionEditor } from '../EasingFunction'
import { DimensionInput } from '../Dimension'
import { Label } from '../../primitives'
import { useId } from 'react'

export default function AnimationInput(
  props: EditorPropsWithLabel<Animation[]>
) {
  const newItem = () => {
    return {
      name: 'none',
      timingFunction: { type: 'cubic-bezier', p1: 0, p2: 0, p3: 0, p4: 0 },
      direction: 'normal',
      duration: { value: 350, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
      fillMode: 'none',
      iterationCount: { value: 1, unit: 'number' },
      playState: 'running',
    } as const
  }
  return (
    <Layers<Animation>
      {...props}
      newItem={newItem}
      content={AnimationEntry}
      stringify={stringifyAnimationList}
    />
  )
}

export const AnimationEntry = (props: LayerProps<Animation>) => {
  return (
    <div sx={{ margin: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <NameInput {...getInputProps(props, 'name')} />
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
        }}
      >
        <TimeInput {...getInputProps(props, 'duration')} />
        <TimeInput {...getInputProps(props, 'delay')} />
      </div>
      <EasingFunctionEditor {...getInputProps(props, 'timingFunction')} />
      <DimensionInput
        {...getInputProps(props, 'iterationCount')}
        units={['number']}
        keywords={['infinite']}
      />
      <SelectInput
        {...getInputProps(props, 'direction')}
        options={animationDirections}
      />
      <SelectInput
        {...getInputProps(props, 'fillMode')}
        options={animationFillModes}
      />
      <SelectInput
        {...getInputProps(props, 'playState')}
        options={animationPlayStates}
      />
    </div>
  )
}

function NameInput({ label, value, onChange }: EditorPropsWithLabel<string>) {
  const id = `${useId()}-${label}`
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
