import { createContext, ReactNode, useContext } from 'react'
import { toCSSObject } from '../../lib/codegen/to-css-object'
import { toReactProps } from '../../lib/codegen/to-react-props'
import { useTheme } from '../providers/ThemeContext'
import { useHtmlEditor } from './Provider'
import { ElementPath, HtmlNode } from './types'
import { cleanAttributesForCanvas, isSamePath } from './util'

const DEFAULT_CANVAS_VALUE = {}
const DEFAULT_ELEMENT_STYLES_IN_CANVAS = {
  cursor: 'default',
}

type CanvasProviderType = {
  canvas?: boolean
}

export function useCanvas() {
  const context = useContext(CanvasContext)
  return context
}

type UseCanvasPropsArguments = {
  path: ElementPath
  value: HtmlNode
}

export function useCanvasProps({ path, value }: UseCanvasPropsArguments) {
  const { canvas } = useContext(CanvasContext)
  const { selected, setSelected } = useHtmlEditor()
  const theme = useTheme()

  const { attributes = {}, style = {} } = value

  const sx = toCSSObject(
    {
      ...(canvas ? DEFAULT_ELEMENT_STYLES_IN_CANVAS : {}),
      ...style,
    },
    theme
  )

  if (isSamePath(path, selected) && canvas) {
    sx.outlineWidth = 'thin'
    sx.outlineStyle = 'solid'
    sx.outlineColor = 'primary'
    sx.outlineOffset = '4px'
    sx.userSelect = 'none'
  }

  const handleSelect = (e: MouseEvent) => {
    if (!canvas) {
      return
    }

    e.stopPropagation()
    setSelected(path)
  }

  const props = toReactProps({
    ...(canvas ? cleanAttributesForCanvas(attributes) : attributes),
    sx,
    onClick: handleSelect,
  })

  return props
}

const CanvasContext = createContext<CanvasProviderType>(DEFAULT_CANVAS_VALUE)

type CanvasProviderProps = CanvasProviderType & {
  children: ReactNode
}

export function CanvasProvider({ children, canvas }: CanvasProviderProps) {
  return (
    <CanvasContext.Provider value={{ canvas }}>
      {children}
    </CanvasContext.Provider>
  )
}
