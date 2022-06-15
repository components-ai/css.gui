import { flip, replace, remove } from '../lib/array'
import { EditorPropsWithLabel } from '../types/editor'
import { SchemaInput } from './inputs/SchemaInput'
import { DataTypeSchema } from './schemas/types'

interface FieldArrayProps<T> extends EditorPropsWithLabel<T[]> {
  /**
   * The component to render each of the individual input values.
   * (See `LayerProps` for what props this takes)
   */
  itemSchema: DataTypeSchema<T>
  /** The values that should be populated when a new item is added. */
  newItem(): T
  /** How to stringify the contents of the layer */
  stringify(value: T[]): string
  defaultValue: T[]
}

/**
 * An alternative field array that is collapsible.
 */
export default function FieldArray<T>(props: FieldArrayProps<T>) {
  const { label = '', value = [], onChange, itemSchema, newItem } = props

  const handleReorder = (i1: number, i2: number) => {
    if (typeof value === 'string') {
      return
    }
    onChange(flip(value, i1, i2))
  }

  return (
    <div sx={{ display: 'grid', gap: 2 }}>
      {value.map((item, i) => {
        return (
          <div
            key={i}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr max-content',
              gap: 1,
            }}
          >
            <SchemaInput
              schema={itemSchema}
              label={'' + i}
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
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.5rem',
          background: 'none',
          cursor: 'pointer',
          color: 'text',
        }}
      >
        + Add {label.toLowerCase()}
      </button>
    </div>
  )
}
