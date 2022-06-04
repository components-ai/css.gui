import { ComponentType, useId } from 'react'
import { kebabCase } from 'lodash-es'
import { Label } from './primitives'
import { flip, replace, remove } from '../lib/array'
import { EditorPropsWithLabel } from '../types/editor'

interface FieldArrayProps<T> {
  label: string
  value: T[]
  onChange(newValue: T[]): void
  /**
   * The component to render each of the individual input values.
   * (See `LayerProps` for what props this takes)
   */
  content: ComponentType<EditorPropsWithLabel<T>>
  /** The values that should be populated when a new item is added. */
  newItem(): T
  /** How to stringify the contents of the layer */
  stringify(value: T[]): string
}

/**
 * An alternative field array that is collapsible.
 */
export default function FieldArray<T>({
  label = '',
  value = [],
  onChange,
  content: Content,
  newItem,
  stringify,
}: FieldArrayProps<T>) {
  const id = `${useId()}-${kebabCase(label)}`

  const handleReorder = (i1: number, i2: number) => {
    onChange(flip(value, i1, i2))
  }

  return (
    <div>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          gap: 2,
        }}
      >
        <Label htmlFor={id}>{label}</Label>
        {stringify(value)}
      </div>
      <div>
        {value.map((item, i) => {
          return (
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr max-content',
                gap: 1,
              }}
            >
              <Content
                value={item}
                onChange={(newValue) => {
                  onChange(replace(value, i, newValue))
                }}
                onRemove={() => onChange(remove(value, i))}
                reorder={{
                  onMoveUp:
                    i === 0
                      ? undefined
                      : () => {
                          handleReorder(i, i - 1)
                        },
                  onMoveDown:
                    i === value.length - 1
                      ? undefined
                      : () => {
                          handleReorder(i, i + 1)
                        },
                }}
                label={'' + i}
              />
            </div>
          )
        })}
        <button
          onClick={() => {
            onChange(value.concat([newItem()]))
          }}
          sx={{
            width: '100%',
            appearance: 'none',
            px: 0,
            py: 2,
            m: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'text',
          }}
        >
          + Add {label.toLowerCase()}
        </button>
      </div>
    </div>
  )
}
