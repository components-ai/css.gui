import * as React from 'react'
import { Theme } from '../../types/theme'

const DEFAULT_THEME_CONTEXT: Theme = {}

const ThemeContext = React.createContext<Theme>(DEFAULT_THEME_CONTEXT)

export const useTheme = (): Theme => React.useContext(ThemeContext)
export const useThemeProperty = (property?: string): any[] => {
  const context = React.useContext(ThemeContext)
  switch (property) {
    case 'fontSize':
      return context.fontSizes || []
    case 'lineHeight':
      return context.lineHeights || []
    case 'space':
      return context.space || []
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
