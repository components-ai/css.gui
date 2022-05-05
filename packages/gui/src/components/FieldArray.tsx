import { Trash, ChevronUp, ChevronDown } from 'react-feather'
import { useState, ComponentType, useId, ReactNode } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import IconButton from './ui/IconButton'
import { kebabCase } from 'lodash-es'
import { Label } from './primitives'
import { ExpandMarker } from './ui/ExpandMarker'

interface FieldArrayProps<T> {
  label: string
  value: T[]
  onChange(newValue: T[]): void
  /**
   * The component to render each of the individual input values.
   * (See `LayerProps` for what props this takes)
   */
  content: ComponentType<LayerProps<T>>
  /** The values that should be populated when a new item is added. */
  newItem(): T
  /** How to stringify the contents of the layer */
  stringify(value: T[]): string
}

export interface LayerProps<T> {
  value: T
  onChange(newValue: T): void
  label: string
}

/**
 * An alternative field array that is collapsible.
 */
export default function FieldArray<T>({
  label,
  value = [],
  onChange,
  content: Content,
  newItem,
  stringify,
}: FieldArrayProps<T>) {
  const id = `${useId()}-${kebabCase(label)}`
  const [open, setOpen] = useState(true)

  const handleReorder = (i1: number, i2: number) => {
    onChange(flip(value, i1, i2))
  }

  return (
    <div>
      <Collapsible.Root id={id} open={open} onOpenChange={setOpen}>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            gap: 2,
          }}
        >
          <Label htmlFor={id}>{label}</Label>
          <Collapsible.Trigger
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              cursor: 'pointer',
              width: '100%',
              background: 'none',
              color: 'text',
              border: 'none',
              p: 0,
            }}
          >
            <ExpandMarker open={open} />
            {stringify(value)}
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content
          sx={{
            my: 2,
            maxWidth: '32rem',
          }}
        >
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
                    label={'' + i}
                  />
                  <div
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <IconButton
                      title="Delete"
                      onClick={() => {
                        onChange(remove(value, i))
                      }}
                    >
                      <Trash size={16} />
                    </IconButton>
                    <div
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifySelf: 'right',
                        alignSelf: 'center',
                        gap: '-0.5rem',
                      }}
                    >
                      <IconButton
                        disabled={i === 0}
                        onClick={() => {
                          if (i > 0) {
                            handleReorder(i, i - 1)
                          }
                        }}
                      >
                        <ChevronUp size={16} />
                      </IconButton>
                      <IconButton
                        disabled={i === value.length - 1}
                        onClick={() => {
                          if (i < value.length - 1) {
                            handleReorder(i, i + 1)
                          }
                        }}
                      >
                        <ChevronDown size={16} />
                      </IconButton>
                    </div>
                  </div>
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
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}

// Return a new array with the given indices flipped
function flip<T>(array: T[], i1: number, i2: number) {
  const copy = [...array]
  copy[i1] = array[i2]
  copy[i2] = array[i1]
  return copy
}

// Return a new array with the value at the index removed
function remove<T>(array: T[], index: number) {
  const copy = [...array]
  copy.splice(index, 1)
  return copy
}

function replace<T>(array: T[], index: number, newValue: T) {
  const copy = [...array]
  copy.splice(index, 1, newValue)
  return copy
}
