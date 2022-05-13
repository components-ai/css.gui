import Layers, { LayerProps } from '../../Layers'
import { Transition } from './types'
import { stringifyTransitionList } from './stringify'
import { getInputProps } from '../../../lib/util'
import { SelectInput } from '../SelectInput'
import { ANIMATABLE_PROPERTIES } from '../../../data/animatable'
import { TimeInput } from '../TimeInput'
import { EasingFunctionEditor } from '../EasingFunction'
import { EditorPropsWithLabel } from '../../../types/editor'

export default function TransitionInput(
  props: EditorPropsWithLabel<Transition[]>
) {
  const newItem = () => {
    return {
      property: 'all',
      timingFunction: { type: 'cubic-bezier', p1: 0, p2: 0, p3: 0, p4: 0 },
      duration: { value: 350, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
    } as const
  }
  return (
    <Layers<Transition>
      {...props}
      newItem={newItem}
      content={TransitionEntry}
      stringify={stringifyTransitionList}
    />
  )
}

export const TransitionEntry = (props: LayerProps<Transition>) => {
  return (
    <div sx={{ margin: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SelectInput
        {...getInputProps(props, 'property')}
        options={ANIMATABLE_PROPERTIES}
      />
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
    </div>
  )
}
