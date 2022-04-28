import * as Collapsible from '@radix-ui/react-collapsible'
import { EasingFunction } from './types'
import { EditorProps } from '../../../types/editor'
import EasingFunctionField from './input'

// A compact wrapper for the easing function field that is suitable for use in other contexts

import { stringifyEasingFunction } from './stringify'
import { EasingFunctionGraph } from './graphs'
import { Label } from '../../primitives'
import { useId } from 'react'
import { kebabCase } from 'lodash-es'

type Props = EditorProps<EasingFunction> & { label: string }
export default function EasingFunctionPicker({
  value,
  onChange,
  label,
}: Props) {
  const id = `${useId()}-${kebabCase(label)}`
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Collapsible.Root id={id}>
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
          {stringifyEasingFunction(value!)}
        </Collapsible.Trigger>
        <Collapsible.Content
          sx={{
            my: 2,
            p: 3,
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.5rem',
            maxWidth: '32rem',
          }}
        >
          <EasingFunctionField value={value} onChange={onChange} />
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}
