import { useCombobox } from 'downshift'
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

interface ComboboxInterface {
  onFilterItems: (filterValue: string) => string[]
  onItemSelected: (selectedItem: string) => void
  items: string[]
  value?: string
  clearOnSelect?: boolean
  decorateItemText?: (text: string) => string
}

export function Combobox({
  onFilterItems,
  onItemSelected,
  items,
  value,
  clearOnSelect = false,
  decorateItemText = (str) => str,
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
    setInputItems(filteredItems)
  }

  const handleItemSelected = (selectedItem: string) => {
    onItemSelected(selectedItem)
    const selectedItemText = decorateItemText
      ? decorateItemText(selectedItem)
      : selectedItem
    setFilterValue(clearOnSelect ? '' : selectedItemText)
  }

  const handleEnter = () => {
    if (items.includes(filterValue)) {
      handleItemSelected(filterValue)
      toggleMenu()
    }
  }

  return (
    <div {...getComboboxProps()}>
      <input
        type="text"
        {...getInputProps({
          ref: inputRef,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setFilterValue(e.target.value)
          },
          onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleEnter()
            }
          },
        })}
        onFocus={() => {
          if (!isOpen) {
            toggleMenu()
            handleFilterItems('')
          }
        }}
        autocorrect='off'
        spellcheck='false'
        sx={{
          WebkitAppearance: 'none',
          appearance: 'none',
          width: '100%',
          border: '1px solid',
          borderRadius: '6px',
          p: 1,
        }}
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
          {isOpen &&
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
                  {decorateItemText(item)}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}
