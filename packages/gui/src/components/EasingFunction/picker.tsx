import * as Collapsible from '@radix-ui/react-collapsible'
import { EasingFunction } from './types'
import { EditorProps } from '../editors/types'
import EasingFunctionField from './input'

// A compact wrapper for the easing function field that is suitable for use in other contexts

import { toCssValue } from './convert'
import { EasingFunctionGraph } from './graphs'

type Props = EditorProps<EasingFunction>
export default function EasingFunctionPicker({ value, onChange }: Props) {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          background: 'none',
          color: 'text',
          border: 'none',
        }}
      >
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 1 1"
          sx={{
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.5rem',
          }}
        >
          <EasingFunctionGraph value={value!} />
        </svg>
        {toCssValue(value!)}
      </Collapsible.Trigger>
      <Collapsible.Content
        sx={{
          my: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.5rem',
        }}
      >
        <EasingFunctionField value={value} onChange={onChange} />
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
