import { useCombobox } from "downshift"
import { useEffect, useId, useRef, useState } from "react"

interface ComboboxInterface {
  onFilterItems: (filterValue: string) => string[]
  onItemSelected: (selectedItem: string) => void
  items: string[]
  value?: string
}

export function Combobox({
  onFilterItems,
  onItemSelected,
  items,
  value
}: ComboboxInterface) {
  const id = useId()
  const inputRef = useRef(null)

  const [inputItems, setInputItems] = useState<string[]>(items)
  const [filterValue, setFilterValue] = useState<string>(value || '')

  useEffect(() => {
    handleFilterItems(filterValue)
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
    items: inputItems,
    selectedItem: filterValue,
    onInputValueChange: ({ inputValue }) => {
      handleFilterItems(inputValue!)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onItemSelected(selectedItem ?? '')
    },
  })

  const handleFilterItems = (newValue: string) => {
    const filteredItems = onFilterItems(newValue)
    setInputItems(filteredItems)
  }

  return (
    <div {...getComboboxProps()}>
      <input
        type='text'          
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
        // value={filterValue}
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
                  onItemSelected('')
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
                    onItemSelected(inputItems[highlightedIndex])
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
