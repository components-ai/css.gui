import * as React from 'react'
import { Theme } from '../../types/theme'

const DEFAULT_THEME: Theme = {}
interface ThemeContext {
  theme: Theme,
  setTheme: (theme: Theme) => void
  themeOptions: Theme[]
}
const ThemeContext = React.createContext<ThemeContext>({
  theme: DEFAULT_THEME,
  themeOptions: [DEFAULT_THEME],
  setTheme: (theme: Theme) => {}
})

export const useTheme = (): ThemeContext => {
  return React.useContext(ThemeContext)
}


export const useThemeProperty = (property?: string): any[] => {
  const { theme } = React.useContext(ThemeContext)
  switch (property) {
    case 'fontSize':
      return theme.fontSizes || []
    case 'lineHeight':
      return theme.lineHeights || []
    default:
      return []
  }
}

type ThemeProviderProps = {
  theme: Theme
  themes?: Theme[]
  children: any
}
export const ThemeProvider = ({ theme: providedTheme, themes, children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>(
    providedTheme || (themes?.length && themes[0]) || {}
  )

  return (
    <ThemeContext.Provider value={{
      theme,
      themeOptions: themes || [theme],
      setTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
