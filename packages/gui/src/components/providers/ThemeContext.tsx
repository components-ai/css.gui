import * as React from 'react'
import { Theme } from '../../types/theme'

const DEFAULT_THEME_CONTEXT: Theme = {}

const ThemeContext = React.createContext<Theme>(DEFAULT_THEME_CONTEXT)

export const useTheme = (): Theme => React.useContext(ThemeContext)

type ThemeProviderProps = {
  theme: Theme
  children: JSX.Element
}
export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
