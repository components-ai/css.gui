import * as React from 'react'
import { property } from 'lodash-es'
import { FontType } from '../../../types/css'
import { EditorProps } from '../../../types/editor'
import { Label } from '../../primitives'
import { useCombobox } from 'downshift'

type Font = {
  fontName: string,
  category: FontCategory
}

const enum FontCategory {
  Sans = 'sans-serif',
  Mono = 'monospace',
  Serif = 'serif',
}

interface Props extends EditorProps<FontType> {
  label: string,
  defaultValue?: FontType
}


export function FontFamilyInput({
  label,
  value,
  onChange,
}: Props) {  
  const id = React.useId()
  const fullId = `${id}-${property || 'fontfamily'}`

  const [allOptions, setAllOptions] = React.useState<Font[]>([])
  const [inputItems, setInputItems] = React.useState<string[]>([])

  const inputRef = React.useRef(null)
  React.useEffect(() => {
    const getFontData = async () => {
      const options = await getAllOptions()
      setAllOptions(options)
      handleFilterItems(value)
    }

    getFontData()
  }, [])

  const [includeSans, setIncSans] = React.useState<boolean>(true)
  const [includeSerif, setIncSerif] = React.useState<boolean>(true)
  const [includeMono, setIncMono] = React.useState<boolean>(true)
  React.useEffect(() => {
    handleFilterItems(value)
  }, [includeMono, includeSans, includeSerif])

  const {
    isOpen,
    toggleMenu,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    selectedItem: value,
    onInputValueChange: ({ inputValue }) => {
      handleFilterItems(inputValue!)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem ?? '')
    },
  })

  const handleFilterItems = (inputValue: string) => {
    const filteredOptions = allOptions.filter((item) => {
      if (item.fontName.toLowerCase().startsWith(inputValue?.toLowerCase() || '')) {
        return (
          (includeSans && item.category === FontCategory.Sans) ||
          (includeSerif && item.category === FontCategory.Serif) ||
          (includeMono && item.category === FontCategory.Mono)
        )
      }
    })

    const items = filteredOptions.map((opt) => opt.fontName).sort()
    setInputItems(items)
  }
  return (
    <div 
      {...getComboboxProps()}
      id={fullId}
    >
      {label && (
        <Label htmlFor={id} sx={{ display: 'block' }}>
          {label}
        </Label>
      )}
      <input
        type='text'
        value={value}
        {...getInputProps({ 
          ref: inputRef,
          onChange: (e: any) => onChange(e.target.value),
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
          {isOpen && inputItems.length > 0 && (
            <div>
              <label sx={{ whiteSpace: 'nowrap', pr: 2 }}>
                <input
                  type="checkbox"
                  checked={includeSans}
                  onChange={() => setIncSans(!includeSans)}
                />
                <span sx={{ fontWeight: 400, pl: 0 }}>Sans</span>
              </label>
              <label sx={{ whiteSpace: 'nowrap', pr: 2 }}>
                <input
                  type="checkbox"
                  checked={includeSerif}
                  onChange={() => setIncSerif(!includeSerif)}
                />
                <span sx={{ fontWeight: 400, pl: 0 }}>Serif</span>
              </label>
              <label sx={{ whiteSpace: 'nowrap', pr: 2 }}>
                <input
                  type="checkbox"
                  checked={includeMono}
                  onChange={() => setIncMono(!includeMono)}
                />
                <span sx={{ fontWeight: 400, pl: 0 }}>Monospace</span>
              </label>
            </div>
          )}
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
                  onChange('')
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
          {isOpen && inputItems.map((item, index) => {
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
                  onChange(inputItems[highlightedIndex])
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

const getAllOptions = async (): Promise<Font[]> => {
  const opts: Font[] = []
  const rawGoogData = await fetch('https://components.ai/api/v1/typefaces/list')
  const rawSystemData = await fetch('https://components.ai/api/v1/typefaces/system')

  const systemFonts = (await rawSystemData.json()) as any
  systemFonts.forEach(({ name, type }: any) => {
    if (
      type === FontCategory.Sans ||
      type === FontCategory.Serif ||
      type === FontCategory.Mono
    ) {
      opts.push({
        fontName: name,
        category: type,
      })
    }
  })

  const googFontsData = (await rawGoogData.json()) as any
  googFontsData.forEach((font: any) => {
    const { category, name } = font
    if (
      category === FontCategory.Sans ||
      category === FontCategory.Serif ||
      category === FontCategory.Mono
    ) {
      opts.push({ fontName: name, category })
    }
  })

  return opts
}
