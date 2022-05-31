import * as React from 'react'
import { Theme } from '../../types/theme'

const DEFAULT_THEME: Theme = {}
interface ThemeContext {
  theme: Theme,
  setActiveTheme?: (index: number) => void
  getThemes?: () => Theme[]
}
const ThemeContext = React.createContext<ThemeContext>({
  theme: DEFAULT_THEME
})

export const useTheme = () => {
  return React.useContext(ThemeContext)
}
// export const useTheme = (): Theme => React.useContext(ThemeContext)

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
  // theme?: Theme
  themes: Theme[]
  children: React.ReactChild
}
export const ThemeProvider = ({ themes, children }: ThemeProviderProps) => {
  console.log(themes, 'these themes')
  const [theme, setTheme] = React.useState<Theme>(
    (themes.length && themes[0]) || {}
  )

  const handleSetActiveTheme = (idx: number) => {
    const t = (themes?.length && themes[idx]) || theme
    setTheme(t)
  }

  const handleGetThemes = () => {
    return themes || []
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      setActiveTheme: handleSetActiveTheme,
      getThemes: handleGetThemes,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
