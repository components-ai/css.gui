import { Trash, ChevronUp, ChevronDown } from 'react-feather'
import { useState, ComponentType, useId } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import IconButton from './ui/IconButton'
import { kebabCase } from 'lodash-es'
import LayerHeader from './LayerHeader'
import { flip, replace, remove } from '../lib/array'
import { InputHeader } from './ui/InputHeader'
import { EditorPropsWithLabel } from '../types/editor'

interface LayersProps<T> extends EditorPropsWithLabel<T[]> {
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
export default function Layers<T>(props: LayersProps<T>) {
  const {
    label = '',
    value = [],
    onChange,
    content: Content,
    stringify,
    newItem,
    thumbnail,
  } = props
  const id = `${useId()}-${kebabCase(label)}`
  const [expandedLayer, setExpandedLayer] = useState(-1)

  const handleReorder = (i1: number, i2: number) => {
    onChange(flip(value, i1, i2))
  }

  return (
    <div>
      <InputHeader {...props} />
      <div
        sx={{
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '6px',
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
                    <LayerHeader preview={thumbnail} text={stringify([item])} />
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
                    p: 3,
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
    </div>
  )
}
