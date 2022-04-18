import { EditorProvider } from 'gui'
import { AppProps } from 'next/app'
import Link from 'next/link'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'
import { NavItem, NavSectionTitle } from '../components/Nav'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <EditorProvider
      theme={{
        fontSizes: [
          { id: '1', value: 16, unit: 'px' },
          { id: '2', value: 24, unit: 'px' },
          { id: '3', value: 32, unit: 'px' },
          { id: '4', value: 48, unit: 'px' },
          { id: '5', value: 64, unit: 'px' },
        ],
        lineHeights: [
          { id: '1', value: 1, unit: 'number' },
          { id: '2', value: 1.2, unit: 'number' },
          { id: '3', value: 1.4, unit: 'number' },
        ],
      }}
    >
      <ThemeProvider theme={theme}>
        <>
          <header
            sx={{
              fontFamily: 'body',
              borderBottom: 'thin solid',
              borderColor: 'border',
              px: [2, 3, 4],
              py: 2,
              fontSize: [2, 3],
            }}
          >
            <Link href="/" passHref={true}>
              <a
                sx={{ fontWeight: 500, color: 'text', textDecoration: 'none' }}
              >
                CSS GUI
              </a>
            </Link>
          </header>
          <div
            sx={{
              fontFamily: 'body',
              display: 'flex',
              flexDirection: ['column', 'row'],
            }}
          >
            <nav
              sx={{
                minHeight: '100vh',
                width: ['100%', 256],
                minWidth: ['100%', 256],
                borderRight: 'thin solid',
                borderColor: 'border',
                pt: [2, 3],
              }}
            >
              <NavSectionTitle>Overview</NavSectionTitle>
              <NavItem href="/introduction">Introduction</NavItem>
              <NavItem href="/getting-started">Getting Started</NavItem>
              <NavSectionTitle>Components</NavSectionTitle>
              <NavItem href="/components/editor">Editor</NavItem>
              <NavSectionTitle>Inputs</NavSectionTitle>
              <NavItem href="/inputs/number">Number</NavItem>
              <NavItem href="/inputs/color-picker">Color Picker</NavItem>
              <NavItem href="/inputs/color-popover">Color Popover</NavItem>
              <NavItem href="/inputs/unit-select">Unit Select</NavItem>
            </nav>
            <div
              sx={{
                py: [3, 4, 5],
                width: '100%',
                '> *': {
                  px: [3, 4, 5],
                  maxWidth: 800,
                  mx: 'auto',
                },
                '> *.full-bleed': {
                  maxWidth: '100%',
                },
              }}
            >
              <Component {...pageProps} />
            </div>
          </div>
        </>
      </ThemeProvider>
    </EditorProvider>
  )
}

export default App
