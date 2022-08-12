import { X } from 'react-feather'
import { Label } from '../../primitives'
import IconButton from '../../ui/IconButton'
import { ChangeEvent, useEffect } from 'react'
import { Combobox } from '../../primitives'
import { ATTRIBUTE_MAP } from '../../../data/attributes'
import { isSlot } from '../../../lib/codegen/util'
import { Slot } from '../types'

interface AttributeEditorProps {
  value: Record<string, string | Slot>
  onChange(value: Record<string, string | Slot>): void
  element: string
}

export const AttributeEditor = ({
  value = {},
  onChange,
  element,
}: AttributeEditorProps) => {
  useEffect(() => {
    handleElementChange()
  }, [element])

  const handleElementChange = () => {
    const newAttributes = Object.entries(value).reduce(
      (acc: any, [k, v]: any) => {
        return ATTRIBUTE_MAP[element].includes(k) ? { ...acc, [k]: v } : acc
      },
      {}
    )

    onChange(newAttributes)
  }

  const handleFilterItems = (input: string) => {
    return ATTRIBUTE_MAP[element].filter((item) => {
      if (item.toLowerCase().startsWith(input.toLowerCase() || '')) {
        return !Object.keys(value).includes(item)
      }
    })
  }

  const handleItemSelected = (selectedItem: string) => {
    onChange({ ...value, [selectedItem]: '' })
  }

  const handleItemRemoved = (removedItem: string) => {
    const newValue = { ...value }
    delete newValue[removedItem]
    onChange(newValue)
  }

  const handleSlotToggle = (key: string) => {
    const val = value[key]
    const slotValue = val as unknown as Slot

    if (isSlot(slotValue)) {
      onChange({
        ...value,
        [key]: slotValue.value as string,
      })
    } else {
      onChange({
        ...value,
        [key]: {
          type: 'slot',
          name: key,
          value: val as string,
        },
      })
    }
  }

  return (
    <div>
      <div sx={{ px: 3 }}>
        <Label>Add attribute</Label>
        <Combobox
          onFilterItems={handleFilterItems}
          onItemSelected={handleItemSelected}
          items={ATTRIBUTE_MAP[element]}
          clearOnSelect
        />
      </div>
      {/* @ts-ignore */}
      {Object.entries(value).map(([key, attrValue]) => {
        if (isSlot(attrValue as unknown as Slot)) {
          return (
            <SlotAttributeEditor
              key={key}
              name={key}
              value={attrValue as unknown as Slot}
              onChange={(newValue: Slot) =>
                onChange({ ...value, [key]: newValue })
              }
              onRemove={() => handleItemRemoved(key)}
              onSlot={() => handleSlotToggle(key)}
            />
          )
        }

        return (
          <StringAttributeEditor
            key={key}
            name={key}
            value={attrValue as string}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            onRemove={() => handleItemRemoved(key)}
            onSlot={() => handleSlotToggle(key)}
          />
        )
      })}
    </div>
  )
}

interface StringAttributeEditorProps {
  name: string
  value: string
  onChange(e: ChangeEvent<HTMLInputElement>): void
  onRemove(): void
  onSlot(): void
}
const StringAttributeEditor = ({
  name,
  value,
  onChange,
  onRemove,
  onSlot,
}: StringAttributeEditorProps) => {
  return (
    <div sx={{ px: 3, pt: 3 }}>
      <Label>
        <span sx={{ display: 'block', width: '100%' }}>{name}</span>
        <div sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <input value={value} onChange={onChange} />
          <IconButton onClick={onRemove}>
            <X size={14} strokeWidth={3} />
          </IconButton>
          <IconButton onClick={onSlot}>Make slot</IconButton>
        </div>
      </Label>
    </div>
  )
}

interface SlotAttributeEditorProps {
  name: string
  value: Slot
  onChange(newValue: Slot): void
  onRemove(): void
  onSlot(): void
}
const SlotAttributeEditor = ({
  name,
  value,
  onChange,
  onRemove,
  onSlot,
}: SlotAttributeEditorProps) => {
  return (
    <div sx={{ px: 3, pt: 3 }}>
      <span sx={{ display: 'block', width: '100%' }}>{name}</span>
      <Label>
        <span sx={{ display: 'block', width: '100%' }}>Name</span>
        <div sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <input
            value={value.name}
            onChange={(e) =>
              onChange({
                ...value,
                name: e.target.value,
              })
            }
          />
        </div>
      </Label>
      <Label>
        <span sx={{ display: 'block', width: '100%' }}>Value</span>
        <div sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <input
            value={value.value}
            onChange={(e) =>
              onChange({
                ...value,
                value: e.target.value,
              })
            }
          />
          <IconButton onClick={onRemove}>
            <X size={14} strokeWidth={3} />
          </IconButton>
          <IconButton onClick={onSlot}>Make string</IconButton>
        </div>
      </Label>
    </div>
  )
}
