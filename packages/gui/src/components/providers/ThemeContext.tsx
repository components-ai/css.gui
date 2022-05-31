import * as React from 'react'
import { Theme } from '../../types/theme'

const DEFAULT_THEME: Theme = {}
interface ThemeContext {
  theme: Theme,
  setActiveTheme: (theme: Theme) => void
  themes: Theme[]
}
const ThemeContext = React.createContext<ThemeContext>({
  theme: DEFAULT_THEME,
  themes: [DEFAULT_THEME],
  setActiveTheme: (theme: Theme) => {}
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
  themes: Theme[]
  children: any
}
export const ThemeProvider = ({ themes, children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>(
    (themes.length && themes[0]) || {}
  )

  return (
    <ThemeContext.Provider value={{
      theme,
      themes,
      setActiveTheme: (newTheme) => setTheme(newTheme),
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
