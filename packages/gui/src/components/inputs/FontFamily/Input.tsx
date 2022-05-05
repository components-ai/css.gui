import * as React from 'react'
import { property } from 'lodash-es'
import { FontFamilyType } from '../../../types/css'
import { EditorProps } from '../../../types/editor'
import { Label } from '../../primitives'
import { useCombobox } from 'downshift'
import { NumberInput } from '../NumberInput'

type Font = {
  name: string,
  category: FontCategory
}
type VariableFont = Record<string, VariableAttribute | string>
type VariableAttribute = {
  min: number
  max: number
  default: number
  step: number
}
const enum FontCategory {
  Sans = 'sans-serif',
  Mono = 'monospace',
  Serif = 'serif',
}
const nameMap: any = {
  opsz: 'Optical Size',
  CASL: 'Casual',
  CRSV: 'Cursive',
  MONO: 'Mono'
}

interface Props extends EditorProps<FontFamilyType> {
  label: string,
  defaultValue?: FontFamilyType
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
  const [variableFont, setVariableFont] = React.useState<VariableFont | undefined>()
  const [variableFontsData, setVariableFontsData] = React.useState<any>({})

  const inputRef = React.useRef(null)

  React.useEffect(() => {
    const getFontData = async () => {
      const fontData = await getFontsData()
      const fontFamily = value?.fontFamily || ''

      setAllOptions(fontData?.fontOptions)
      setVariableFontsData(fontData?.variableFontsData)
      setVariableFont(fontData.variableFontsData[fontFamily])

      handleFilterItems(fontFamily)
    }

    getFontData()
  }, [])

  const [includeSans, setIncSans] = React.useState<boolean>(true)
  const [includeSerif, setIncSerif] = React.useState<boolean>(true)
  const [includeMono, setIncMono] = React.useState<boolean>(true)

  React.useEffect(() => {
    handleFilterItems(value.fontFamily)
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
    selectedItem: value.fontFamily,
    onInputValueChange: ({ inputValue }) => {
      handleFilterItems(inputValue!)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      handleFontChange(selectedItem ?? '')
    },
  })

  const handleFilterItems = (inputValue: string) => {
    const filteredOptions = allOptions.filter((item) => {
      if (item.name.toLowerCase().startsWith(inputValue?.toLowerCase() || '')) {
        return (
          (includeSans && item.category === FontCategory.Sans) ||
          (includeSerif && item.category === FontCategory.Serif) ||
          (includeMono && item.category === FontCategory.Mono)
        )
      }
    })

    const items = filteredOptions.map((opt) => opt.name).sort()
    setInputItems(items)
  }

  const handleFontChange = (name: string) => {
    const fontData = variableFontsData[name] ?? {}
    onChange({ 
      ...(name === variableFont?.name ? value : {}), 
      fontFamily: name
    })
    setVariableFont(fontData)
  }

  const handleCustomAxesChange = (axisKey: string, newValue: any) => {
    
    const axisDict: Record<string, any> = {}
    value.fontVariationSettings?.split(',')
      .forEach((axis: string) => {
        const axisSplit = axis.split(' ')
        const k = axisSplit[0]
        const v = axisSplit[1]
        axisDict[k] = v
      })

    axisDict[`'${axisKey}'`] = newValue

    const fontVariationSettings = Object.entries(axisDict)
      .map(([k, v]) => `${k} ${v}`)
      .join(',')

    onChange({ ...value, fontVariationSettings })
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
          onChange: (e: any) => handleFontChange(e.target.value),
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
                  handleFontChange('')
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
                  handleFontChange(inputItems[highlightedIndex])
                  toggleMenu()
                }}
              >
                {item}
              </li>
            )
          })}
        </ul>
      </div>
      {variableFont && Object.entries(variableFont).map(([k, v]) => {
        if (['name', 'ital'].includes(k)) return null
        if (typeof(v) === 'string') return null

        if (k === 'wdth') {
          return (
            <NumberInput
              value={value.fontStretch ?? v.default} 
              onChange={(newVal: number) => onChange({ ...value, fontStretch: newVal })}
              min={v.min}
              max={v.max}
              step={v.step}
              label='Width'
              sx={{ width: '100%' }}
            />
          )
        }

        if (k === 'wght') {
          return (
            <NumberInput
              value={value.fontWeight ?? v.default} 
              onChange={(newVal: number) => onChange({ ...value, fontWeight: newVal })}
              min={v.min}
              max={v.max}
              step={v.step}
              label='Font Weight'
              sx={{ width: '100%' }}
            />
          )
        }

        return (
          <CustomAxis
            value={value.fontVariationSettings ?? `'${k}' ${v.default};`} 
            onChange={(e: any) => handleCustomAxesChange(k, e)}
            axisKey={k}
            min={v.min}
            max={v.max}
            step={v.step}
            label={nameMap[k] ?? k}
            sx={{ width: '100%' }}
          />
        )
      })}
    </div>
  )
}

const CustomAxis = ({
  defaultValue,
  axisKey,
  value,
  onChange,
  ...props
}: any) => {
  const parseCustomAxisValue = () => {
    const splitAxis = value?.split(',')

    if (splitAxis?.length > 0) {
      for (const ax of splitAxis) {
        if (ax.startsWith(`'${axisKey}'`)) {
          return Number(ax.match(/-?[\d.]+/))
        }
      }
    }

    return defaultValue
  }

  return (
    <NumberInput
      {...props}
      value={parseCustomAxisValue()}
      onChange={onChange}
    />
  )
}

type APIFontData = {
  fontOptions: Font[]
  variableFontsData: any
}
const getFontsData = async (): Promise<APIFontData> => {
  const fontOptions: Font[] = []
  const rawGoogData = await fetch('https://components.ai/api/v1/typefaces/list')
  const rawSystemData = await fetch('https://components.ai/api/v1/typefaces/system')
  const variableFontsData = await fetch('https://components.ai/api/v1/typefaces/variable')

  const systemFonts = (await rawSystemData.json()) as any
  systemFonts.forEach(({ name, type }: any) => {
    if (
      type === FontCategory.Sans ||
      type === FontCategory.Serif ||
      type === FontCategory.Mono
    ) {
      fontOptions.push({
        name,
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
      fontOptions.push({ name, category })
    }
  })
  
  return {
    fontOptions,
    variableFontsData: (await variableFontsData.json())
  }
}
