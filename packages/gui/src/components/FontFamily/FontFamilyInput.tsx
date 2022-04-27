import * as React from 'react'
import { useTheme } from '../providers/ThemeContext'
import { property } from 'lodash-es'
import { FontFam } from '../../types/css'
import { EditorProps } from '../editors/types'
import { useCombobox } from 'downshift'

interface Props extends EditorProps<FontFam> {
  label: string,
  defaultValue?: FontFam
}

export function FontFamilyInput({
  label,
  value,
  onChange,
}: Props) {
  const theme = useTheme()
  const id = React.useId()
  const fullId = `${id}-${property || 'fontfamily'}`

  const inputRef = React.useRef(null)
  const [allOptions, setAllOptions] = React.useState<Font[]>([])
  const [inputItems, setInputItems] = React.useState<string[]>([])


  React.useEffect(() => {
    const getFontData = async () => {
      const options = await getAllOptions()
      setAllOptions(options)
      handleFilterItems(value)
    }

    getFontData()
  }, [])

  const {
    isOpen,
    closeMenu,
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
        return item
        // return (
        //   (includeSans && item.category === 'sans-serif') ||
        //   (includeSerif && item.category === 'serif') ||
        //   (includeMono && item.category === 'monospace')
        // )
      }
    })

    const items = filteredOptions.map((opt) => opt.fontName).sort()
    setInputItems(items)
  }
  return (
    <div {...getComboboxProps()}>
      <label>{label}</label>
      <input
        type='text'
        onChange={(e) => onChange(e.target.value)}
        value={value}
        sx={{ width: '100%' }}
        {...getInputProps()}
      />
      <div>
        <ul
          {...getMenuProps}
          sx={{
            bg: 'background',
            fontSize: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
            pl: 0,
            pr: 0,
            // position: 'absolute',
            marginLeft: 0,
            marginRight: 0,
            top: '0',
            left: '-1px',
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
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            zIndex: 16,
          }}
        >
          {inputItems.length === 0 && (
            <div>
              <span>No Results</span>
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
                  // toggleMenu()
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

type Font = {
  fontName: string,
  category: FontCategory
}

const enum FontCategory {
  Sans = 'sans-serif',
  Mono = 'monospace',
  Serif = 'serif',
}

const getAllOptions = async (): Promise<Font[]> => {
  const opts: Font[] = []
  const res = await fetch('https://components.ai/api/v1/typefaces/list')

  // system fonts 
  const googFontsData = (await res.json()) as any

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