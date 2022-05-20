import { useCombobox } from "downshift"
import { Trash2 } from "react-feather"
import { Label } from "../primitives"
import IconButton from "../ui/IconButton"
import { useState, useId, useRef, useEffect } from 'react'

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

export const AttributeEditor = ({ value = {}, onChange, element }: AttributeEditorProps) => {
  const id = useId()
  const inputRef = useRef(null)

  const [inputItems, setInputItems] = useState<string[]>(ATTRIBUTE_MAP[element] || [])
  const [filterValue, setFilterValue] = useState<string>('')

  useEffect(() => {
    handleFilterItems(filterValue)
  }, [])

  useEffect(() => {
    // TODO: swap out attributes on element change
  }, [element])

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
      handleItemChange(selectedItem ?? '')
    },
  })

  const handleFilterItems = (input: string) => {
    const filteredItems = ATTRIBUTE_MAP[element]
      .filter((item) => {
        if (item.toLowerCase().startsWith(input.toLowerCase() || '')) {
          return !Object.keys(value).includes(item)
        }
      })
    setInputItems(filteredItems)
  }

  const handleItemChange = (selectedItem: string) => {
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
      <div {...getComboboxProps()}>
      <input
        type='text'
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
                  handleItemChange('')
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
                    handleItemChange(inputItems[highlightedIndex])
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
    </div>
  )
}

// interface ComboboxInterface {
//   onFilterItems: (filterValue: string) => {}
//   onItemChange: (selectedItem: string) => {}
//   items: any[]
// }

// const Combobox = ({ onFilterItems, onItemChange, items }: any) => {
//   const id = useId()
//   const inputRef = useRef(null)

//   const [inputItems, setInputItems] = useState<any[]>(items)
//   const [filterValue, setFilterValue ] = useState<string>('')

//   useEffect(() => {
//     onFilterItems(filterValue)
//   }, [])

//   const {
//     isOpen,
//     toggleMenu,
//     getMenuProps,
//     getInputProps,
//     getComboboxProps,
//     highlightedIndex,
//     getItemProps,
//   } = useCombobox({
//     id,
//     items: inputItems,
//     selectedItem: filterValue,
//     onInputValueChange: ({ inputValue }) => {
//       onFilterItems(inputValue!)
//     },
//     onSelectedItemChange: ({ selectedItem }) => {
//       onItemChange(selectedItem ?? '')
//     },
//   })

//   const handleFilterItems = (newValue: string) => {
    
//     setInputItems([]) // ....
//     onFilterItems(filterValue)
//   }
//   return (
//     <div {...getComboboxProps()}>
//       <input
//         type='text'
//         value={filterValue}
//         {...getInputProps({
//           ref: inputRef,
//           onChange: (e: any) => setFilterValue(e.target.value),
//         })}
//         onFocus={() => {
//           if (!isOpen) {
//             toggleMenu()
//             onFilterItems('')
//           }
//         }}
//         sx={{ width: '100%' }}
//       />
//       <div
//         sx={{
//           position: 'relative',
//           width: '100%',
//           display: isOpen ? 'block' : 'none',
//         }}
//       >
//         <ul
//           {...getMenuProps()}
//           sx={{
//             bg: 'background',
//             fontSize: 0,
//             marginTop: 0,
//             marginBottom: 0,
//             paddingBottom: 0,
//             pl: 0,
//             pr: 0,
//             marginLeft: 0,
//             marginRight: 0,
//             top: 0,
//             left: '-1px',
//             position: 'absolute',
//             right: 0,
//             width: 'calc(100% + 2px)',
//             listStyleType: 'none',
//             borderWidth: '1px',
//             borderStyle: 'solid',
//             borderColor: 'border',
//             borderTopWidth: 0,
//             borderTopColor: 'transparent',
//             borderBottomColor: isOpen ? 'border' : 'transparent',
//             maxHeight: 320,
//             overflow: 'auto',
//             borderTopRightRadius: 0,
//             borderTopLeftRadius: 0,
//             zIndex: 10,
//           }}
//         >
//           {isOpen && inputItems.length === 0 && (
//             <div
//               sx={{
//                 display: 'flex',
//                 width: '100%',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 paddingY: 2,
//                 paddingX: 3,
//                 fontSize: 1,
//               }}
//             >
//               <span>No results</span>
//               <button
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                 }}
//                 onClick={() => {
//                   onItemChange('')
//                   // @ts-ignore
//                   inputRef.current.focus()
//                   if (!isOpen) {
//                     toggleMenu()
//                   }
//                 }}
//               >
//                 <span sx={{ mr: 2 }}>Clear</span>
//               </button>
//             </div>
//           )}
//           {isOpen &&
//             inputItems.map((item, index) => {
//               return (
//                 <li
//                   sx={{
//                     margin: 0,
//                     pl: 3,
//                     py: 1,
//                     backgroundColor:
//                       highlightedIndex === index
//                         ? 'backgroundOffset'
//                         : 'inherit',
//                     ':last-of-type': {
//                       borderBottomRightRadius: 7,
//                       overflow: 'hidden',
//                       pb: 1,
//                     },
//                   }}
//                   key={`${item}${index}`}
//                   {...getItemProps({ item, index })}
//                   onClick={() => {
//                     onItemChange(inputItems[highlightedIndex])
//                     toggleMenu()
//                   }}
//                 >
//                   {item}
//                 </li>
//               )
//             })}
//         </ul>
//       </div>
//     </div>
//   )
// }