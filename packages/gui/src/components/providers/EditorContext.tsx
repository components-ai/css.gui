import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import { theme as uiTheme } from '../ui/theme'
import { Theme } from '../../types/theme'
import { ThemeProvider } from './ThemeContext'

type EditorProviderProps = {
  children: JSX.Element
  theme: Theme
}
export const EditorProvider = ({ children, theme }: EditorProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeUIProvider theme={uiTheme}>{children}</ThemeUIProvider>
    </ThemeProvider>
  )
}
