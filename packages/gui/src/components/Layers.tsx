import { Trash, ChevronUp, ChevronDown } from 'react-feather'
import { useState, ComponentType, useId, ReactNode } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import * as Collapsible from '@radix-ui/react-collapsible'
import IconButton from './ui/IconButton'
import { kebabCase } from 'lodash-es'
import { Label } from './primitives'
import LayerHeader from './LayerHeader'

interface LayersProps<T> {
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
  /** An optional thumbnail to display in the header */
  thumbnail?: ComponentType<{ value: string }>
}

export interface LayerProps<T> {
  value: T
  onChange(newValue: T): void
}

/**
 * An alternative field array that is collapsible.
 */
export default function Layers<T>({
  label,
  value = [],
  onChange,
  content: Content,
  stringify,
  newItem,
  thumbnail,
}: LayersProps<T>) {
  const id = `${useId()}-${kebabCase(label)}`
  const [expandedLayer, setExpandedLayer] = useState(-1)

  const handleReorder = (i1: number, i2: number) => {
    onChange(flip(value, i1, i2))
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Collapsible.Root id={id} defaultOpen>
        <Collapsible.Trigger
          sx={{
            cursor: 'pointer',
            width: '100%',
            background: 'none',
            color: 'text',
            border: 'none',
            p: 0,
          }}
        >
          <LayerHeader preview={thumbnail} text={stringify(value)} />
        </Collapsible.Trigger>
        <Collapsible.Content
          sx={{
            my: 2,
            maxWidth: '32rem',
          }}
        >
          <div
            sx={{
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 8,
            }}
          >
            <Accordion.Root
              type="single"
              collapsible
              value={expandedLayer.toString()}
              onValueChange={(i) => setExpandedLayer(i === '' ? -1 : +i)}
            >
              {value.map((item, i) => {
                return (
                  <Accordion.Item value={i.toString()} key={i}>
                    <Accordion.Header
                      sx={{ margin: 0, lineHeight: 0, position: 'relative' }}
                    >
                      <Accordion.Trigger
                        sx={{
                          width: '100%',
                          appearance: 'none',
                          background: 'none',
                          border: 'none',
                          borderBottom: '1px solid',
                          borderColor: 'border',
                          cursor: 'pointer',
                          px: 2,
                        }}
                      >
                        <LayerHeader
                          preview={thumbnail}
                          text={stringify([item])}
                        />
                      </Accordion.Trigger>
                      <div
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mr: 2,
                        }}
                      >
                        <IconButton
                          title="Delete"
                          onClick={() => {
                            onChange(remove(value, i))
                            // If the deleted value was expanded, close it
                            if (i === expandedLayer) {
                              setExpandedLayer(-1)
                            } else if (i < expandedLayer) {
                              // If the deleted value was at a lower index, adjust expanded value accordingly
                              setExpandedLayer((v) => v - 1)
                            }
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
                                if (i === expandedLayer) {
                                  setExpandedLayer(i - 1)
                                } else if (i - 1 === expandedLayer) {
                                  setExpandedLayer(i)
                                }
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
                              if (i === expandedLayer) {
                                setExpandedLayer(i + 1)
                              } else if (i + 1 === expandedLayer) {
                                setExpandedLayer(i)
                              }
                            }}
                          >
                            <ChevronDown size={16} />
                          </IconButton>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Content
                      sx={{
                        borderBottom: '1px solid',
                        borderColor: 'border',
                      }}
                    >
                      <Content
                        value={item}
                        onChange={(newValue) => {
                          onChange(replace(value, i, newValue))
                        }}
                      />
                    </Accordion.Content>
                  </Accordion.Item>
                )
              })}
            </Accordion.Root>
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
