import { useState } from 'react'
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
}

/**
 * An alternative field array that is collapsible.
 */
export default function FieldArray<T>(props: FieldArrayProps<T>) {
  const { label = '', value = [], onChange, itemSchema } = props
  const [dragIndex, setDragIndex] = useState(-1)

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
          <>
            <DropZone />
            <div
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr max-content',
                gap: 1,
                // opacity: i === dragIndex ? 0.75 : 1,
                backgroundColor:
                  i === dragIndex ? 'backgroundOffset' : 'transparent',
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
                onDrag={() => {
                  setDragIndex(i)
                }}
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
          </>
        )
      })}
      <button
        onClick={() => {
          onChange(value.concat([itemSchema.defaultValue]))
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

interface DropZoneProps {}

function DropZone() {
  const [hovered, setHovered] = useState(false)
  return (
    <div sx={{ position: 'relative' }}>
      <div
        sx={{
          position: 'absolute',
          height: '1rem',
          width: '100%',
          ':hover': {
            backgroundColor: 'red',
          },
        }}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      />
    </div>
  )
}
