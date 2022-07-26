import * as React from 'react'
import { Theme } from '../../types/theme'

const DEFAULT_THEME_CONTEXT: Theme = {}

const ThemeContext = React.createContext<Theme>(DEFAULT_THEME_CONTEXT)

export const useTheme = (): Theme => React.useContext(ThemeContext)
export const useThemeProperty = (
  property?: string
): any[] | Record<string, string> => {
  const context = React.useContext(ThemeContext)
  switch (property) {
    case 'fontSizes':
      return context.fontSizes || []
    case 'lineHeights':
      return context.lineHeights || []
    case 'space':
      return context.space || []
    case 'borderRadius':
      return context.borderRadius || []
    case 'borderWidths':
      return context.borderWidths || []
    case 'borderStyles':
      return context.borderStyles || []
    case 'colors':
      return context.colors || []
    case 'fonts':
      return context.fonts || {}
    case 'fontWeights':
      return context.fontWeights || []
    case 'letterSpacings':
      return context.letterSpacings || []
    case 'text':
      return context.text || []
    case 'textShadows':
      return context.textShadows || []
    case 'gradients':
      return context.gradients || []
    case 'transitions':
      return context.transitions || []
    case 'sizes':
      return context.sizes || []
    default:
      return []
  }
}

type ThemeProviderProps = {
  theme?: Theme
  children: any
}
export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme || DEFAULT_THEME_CONTEXT}>
      {children}
    </ThemeContext.Provider>
  )
}
