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
  const isDragging = dragIndex >= 0

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
            {isDragging && <DropZone />}
            <div
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr max-content',
                gap: 1,
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
                onDragEnd={() => {
                  setDragIndex(-1)
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
    <div sx={{ position: 'relative', height: '0px' }}>
      <div
        sx={{
          position: 'absolute',
          height: '2rem',
          width: '100%',
          top: '-1rem',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          '::before': {
            position: 'absolute',
            content: '""',
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: hovered ? 'primary' : 'transparent',
          },
        }}
        onDragOver={() => setHovered(true)}
        onDragLeave={() => setHovered(false)}
      ></div>
    </div>
  )
}
