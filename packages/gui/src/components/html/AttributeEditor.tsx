import { Trash2 } from "react-feather"
import { Label } from "../primitives"
import IconButton from "../ui/IconButton"
import { useEffect } from 'react'
import { Combobox } from "../primitives"

interface AttributeEditorProps {
  value: Record<string, string>
  onChange(value: Record<string, string>): void
  element: string
}

const GLOBAL_ATTRIBUTES = ['class', 'id', 'title']
const ATTRIBUTE_MAP: Record<string, string[]> = {
  a: [...GLOBAL_ATTRIBUTES, 'href', 'target'],
  button: ['disabled'],
  img: [...GLOBAL_ATTRIBUTES, 'src', 'alt'],
  input: [...GLOBAL_ATTRIBUTES, 'type', 'name', 'disabled', 'required'],
  h1: GLOBAL_ATTRIBUTES,
  h2: GLOBAL_ATTRIBUTES,
  h3: GLOBAL_ATTRIBUTES,
  h4: GLOBAL_ATTRIBUTES,
  h5: GLOBAL_ATTRIBUTES,
  h6: GLOBAL_ATTRIBUTES,
  span: GLOBAL_ATTRIBUTES,
  p: GLOBAL_ATTRIBUTES,
} 

export const AttributeEditor = ({
  value = {},
  onChange,
  element
}: AttributeEditorProps) => {
  useEffect(() => {
    handleElementChange()
  }, [element])

  const handleElementChange = () => {
    const newAttributes = Object.entries(value).reduce((acc: any, [k, v]: any) => {
      return ATTRIBUTE_MAP[element].includes(k)
        ? { ...acc, [k]: v }
        : acc
    }, {})

    onChange(newAttributes)
  }

  const handleFilterItems = (input: string) => {
    return ATTRIBUTE_MAP[element]
      .filter((item) => {
        if (item.toLowerCase().startsWith(input.toLowerCase() || '')) {
          return !Object.keys(value).includes(item)
        }
      })
  }

  const handleItemSelected = (selectedItem: string) => {
    onChange({ ...value, [selectedItem]: '' })
  }

  return (
    <div>
      {/* @ts-ignore */}
      {Object.entries(value).map(([key, attrValue]) => {
        return (
          <div sx={{ display: 'flex' }}>
            <Label>
              {key}
              <input
                value={attrValue}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
              />
            </Label>
            <IconButton>
              <Trash2 size={14} />
            </IconButton>
          </div>
        )
      })}
      <Combobox
        onFilterItems={handleFilterItems}
        onItemSelected={handleItemSelected}
        items={ATTRIBUTE_MAP[element]}
      />
    </div>
  )
}
