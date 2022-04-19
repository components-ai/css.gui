import { EditorProvider } from 'gui'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'
import { Sidebar } from '../components/Sidebar'
import { PageWrap } from '../components/PageWrap'
import { Layout } from '../components/Layout'

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
        <Layout>
          <Sidebar />
          <PageWrap>
            <Component {...pageProps} />
          </PageWrap>
        </Layout>
      </ThemeProvider>
    </EditorProvider>
  )
}

export default App
