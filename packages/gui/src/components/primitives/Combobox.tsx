import { useCombobox } from 'downshift'
import { Component, ComponentType, useEffect, useId, useRef, useState } from 'react'

interface ComboboxInterface {
  onFilterItems: (filterValue: string) => string[]
  onItemSelected: (selectedItem: string) => void
  items: string[] | any[], // todo: type groups correctly
  group?: boolean,
  value?: string
  clearOnSelect?: boolean
}

export function Combobox({
  onFilterItems,
  onItemSelected,
  items,
  group = true,
  value,
  clearOnSelect = false,
}: ComboboxInterface) {
  const id = useId()
  const inputRef = useRef(null)

  const [inputItems, setInputItems] = useState<string[] | any[]>([])
  const [filterValue, setFilterValue] = useState<string>(value || '')

  useEffect(() => {
    handleFilterItems(filterValue)
    if (group) {
      // @ts-ignore
      const flatItems = items.map((item: any) => item.items).flat()
      setInputItems(flatItems)
    } else {
      setInputItems(items)
    }
  }, [])

  const {
    isOpen,
    toggleMenu,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    id,
    initialInputValue: value,
    items: inputItems,
    selectedItem: filterValue,
    onInputValueChange: ({ inputValue }) => {
      handleFilterItems(inputValue!)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      handleItemSelected(selectedItem ?? '')
    },
  })

  const handleFilterItems = (newValue: string) => {
    const filteredItems = onFilterItems(newValue)
    console.log(filteredItems, 'items filtered')
    setInputItems(filteredItems)
  }

  const handleItemSelected = (selectedItem: string) => {
    console.log(selectedItem, 'selected')
    onItemSelected(selectedItem)
    setFilterValue(clearOnSelect ? '' : selectedItem)
  }

  return (
    <div {...getComboboxProps()}>
      <input
        type="text"
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
                  handleItemSelected('')
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
          {isOpen && !group &&
            inputItems.map((item, index) => {
              return (
                <li
                  sx={{
                    margin: 0,
                    pl: 3,
                    py: 1,
                    cursor: 'auto',
                    userSelect: 'none',
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
                    handleItemSelected(inputItems[highlightedIndex])
                    toggleMenu()
                  }}
                >
                  {item}
                </li>
              )
          })}
          {isOpen &&
          group &&
          //@ts-ignore
          items.reduce((acc, curr, sectionIdx) => {

            // todo: dont push section if items length is 0 after filter
            acc.sections.push(
              <div>
                <div>{curr.title}</div>
                {curr.items.map((item, itemIdx) => {
                  if (!item.toLowerCase().startsWith(filterValue)) return null
                  const index = acc.itemIndex++
                  return <li
                    {...getItemProps({ item, index })}
                    sx={{
                      margin: 0,
                      pl: 3,
                      py: 1,
                      cursor: 'auto',
                      userSelect: 'none',
                      backgroundColor:
                        highlightedIndex === index
                          ? 'backgroundOffset'
                          : 'inherit',
                      ':last-of-type': {  // todo: not right result with sectioning
                        borderBottomRightRadius: 7,
                        overflow: 'hidden',
                        pb: 1,
                      },
                    }}
                    key={`${item}${index}`}
                    onClick={() => {
                      console.log(inputItems, highlightedIndex, '???')
                      handleItemSelected(inputItems[highlightedIndex])
                      toggleMenu()
                    }}
                  >
                    {item}
                  </li>
                })}
              </div>
            )
            return acc
          }, { sections: [] as any[], itemIndex: 0 }).sections}
        </ul>
      </div>
    </div>
  )
}
