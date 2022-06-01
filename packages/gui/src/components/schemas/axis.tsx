import { isNil } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { Label } from '../primitives'
import { DataTypeSchema } from './types'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from 'react-feather'

interface CreateAxisSchema<T> {
  itemSchema: DataTypeSchema<T>
}

export function axisSchema<T>({
  itemSchema,
}: // keywords = [],
CreateAxisSchema<T>): DataTypeSchema<{ x: T; y?: T }> {
  return {
    input(props) {
      const linked = isNil(props.value.y)
      const ItemInput = itemSchema.input
      return (
        <div>
          <Label>{props.label}</Label>
          <div sx={{ display: 'flex', gap: 2 }}>
            <Toggle.Root
              title="Link inputs"
              sx={{
                p: 0,
                background: 'none',
                border: 'none',
                color: 'muted',

                '&[data-state=on]': {
                  color: 'text',
                },
              }}
              pressed={linked}
              onPressedChange={(pressed) => {
                if (pressed) {
                  props.onChange({ x: props.value.x })
                } else {
                  props.onChange({ x: props.value.x, y: props.value.x })
                }
              }}
            >
              <Link size={14} />
            </Toggle.Root>
            <ItemInput {...getInputProps(props, 'x')} />
            {!linked && <ItemInput {...getInputProps(props, 'y' as any)} />}
          </div>
        </div>
      )
    },
    stringify(value) {
      const { x, y } = value
      if (isNil(y)) {
        return itemSchema.stringify(x)
      }
      return `${itemSchema.stringify(x)} ${itemSchema.stringify(y)}`
    },
    defaultValue: { x: itemSchema.defaultValue, y: itemSchema.defaultValue },
  }
}
