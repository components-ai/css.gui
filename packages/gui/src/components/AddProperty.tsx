import { useCombobox } from 'downshift'
import { useEffect, useId, useRef, useState } from 'react'
import { properties as propertyList } from '../data/properties'
import { getDefaultValue } from '../lib/defaults'
import { Styles } from '../types/css'
import { Label } from './primitives'
import { useDynamicControls } from './providers/DynamicPropertiesContext'
import { useEditor } from './providers/EditorContext'

interface Props {
  styles: Styles
}
export const AddPropertyControl = ({ styles }: Props) => {
  const { setField } = useEditor()
  const { addDynamicProperty } = useDynamicControls()
  const id = useId()
  const inputRef = useRef(null)

  // @ts-ignore
  const allProperties: string[] = Object.entries(propertyList)
    .map(([name, data]) => {
      return data.type !== 'none' ? name : null
    })
    .filter(Boolean)

  const [inputItems, setInputItems] = useState<string[]>([])
  const [filterValue, setFilterValue] = useState<string>('')

  useEffect(() => {
    handleFilterItems(filterValue)
  }, [])

  const {
    isOpen,
    toggleMenu,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    id,
    items: inputItems,
    selectedItem: filterValue,
    onInputValueChange: ({ inputValue }) => {
      handleFilterItems(inputValue!)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      handleAddProperty(selectedItem ?? '')
    },
  })

  const handleFilterItems = (input: string) => {
    const styleItems = Object.keys(styles)
    const filteredItems = allProperties
      .filter((item) => {
        if (item.toLowerCase().startsWith(input.toLowerCase() || '')) {
          return !styleItems.includes(item)
        }
      })
      .sort()
    setInputItems(filteredItems)
  }

  const handleAddProperty = (propertyName: string) => {
    setFilterValue(propertyName)
    setField(propertyName, getDefaultValue(propertyName))
    if (addDynamicProperty) {
      addDynamicProperty(propertyName)
    }
  }

  return (
    <div {...getComboboxProps()}>
      <Label htmlFor={id} sx={{ display: 'block' }}>
        Add Property
      </Label>
      <input
        type="text"
        value={filterValue}
        {...getInputProps({
          ref: inputRef,
          onChange: (e: any) => setFilterValue(e.target.value),
        })}
        onFocus={() => {
          if (!isOpen) {
            toggleMenu()
            handleFilterItems('')
          }
        }}
        sx={{ width: '100%' }}
      />
      <div
        sx={{
          position: 'relative',
          width: '100%',
          display: isOpen ? 'block' : 'none',
        }}
      >
        <ul
          {...getMenuProps()}
          sx={{
            bg: 'background',
            fontSize: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
            pl: 0,
            pr: 0,
            marginLeft: 0,
            marginRight: 0,
            top: 0,
            left: '-1px',
            position: 'absolute',
            right: 0,
            width: 'calc(100% + 2px)',
            listStyleType: 'none',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'border',
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            borderBottomColor: isOpen ? 'border' : 'transparent',
            maxHeight: 320,
            overflow: 'auto',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            zIndex: 10,
          }}
        >
          {isOpen && inputItems.length === 0 && (
            <div
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingY: 2,
                paddingX: 3,
                fontSize: 1,
              }}
            >
              <span>No results</span>
              <button
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                onClick={() => {
                  handleAddProperty('')
                  // @ts-ignore
                  inputRef.current.focus()
                  if (!isOpen) {
                    toggleMenu()
                  }
                }}
              >
                <span sx={{ mr: 2 }}>Clear</span>
              </button>
            </div>
          )}
          {isOpen &&
            inputItems.map((item, index) => {
              return (
                <li
                  sx={{
                    margin: 0,
                    pl: 3,
                    py: 1,
                    backgroundColor:
                      highlightedIndex === index
                        ? 'backgroundOffset'
                        : 'inherit',
                    ':last-of-type': {
                      borderBottomRightRadius: 7,
                      overflow: 'hidden',
                      pb: 1,
                    },
                  }}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                  onClick={() => {
                    handleAddProperty(inputItems[highlightedIndex])
                    toggleMenu()
                  }}
                >
                  {item}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}
