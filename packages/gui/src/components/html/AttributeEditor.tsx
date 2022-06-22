import { X } from 'react-feather'
import { Label } from '../primitives'
import IconButton from '../ui/IconButton'
import { useEffect } from 'react'
import { Combobox } from '../primitives'
import { ATTRIBUTE_MAP, GLOBAL_ATTRIBUTES } from '../../data/attributes'

interface AttributeEditorProps {
  value: Record<string, string>
  onChange(value: Record<string, string>): void
  element: string
}

export const AttributeEditor = ({
  value = {},
  onChange,
  element,
}: AttributeEditorProps) => {
  const attrs = ATTRIBUTE_MAP[element] || GLOBAL_ATTRIBUTES

  useEffect(() => {
    handleElementChange()
  }, [element])

  const handleElementChange = () => {
    const newAttributes = Object.entries(value).reduce(
      (acc: any, [k, v]: any) => {
        return attrs.includes(k) ? { ...acc, [k]: v } : acc
      },
      {}
    )

    onChange(newAttributes)
  }

  const handleFilterItems = (input: string) => {
    return attrs.filter((item) => {
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

  return (
    <div>
      <div sx={{ px: 3 }}>
        <Label>Add attribute</Label>
        <Combobox
          onFilterItems={handleFilterItems}
          onItemSelected={handleItemSelected}
          items={attrs}
          clearOnSelect
        />
      </div>
      {/* @ts-ignore */}
      {Object.entries(value).map(([key, attrValue]) => {
        return (
          <div sx={{ px: 3, pt: 3 }}>
            <Label>
              <span sx={{ display: 'block', width: '100%' }}>{key}</span>
              <div sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <input
                  value={attrValue}
                  onChange={(e) =>
                    onChange({ ...value, [key]: e.target.value })
                  }
                />
                <IconButton onClick={() => handleItemRemoved(key)}>
                  <X size={14} strokeWidth={3} />
                </IconButton>
              </div>
            </Label>
          </div>
        )
      })}
    </div>
  )
}
