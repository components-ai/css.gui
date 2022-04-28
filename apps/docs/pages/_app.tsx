import { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '@compai/css-gui'
import { Sidebar } from '../components/Sidebar'
import { PageWrap } from '../components/PageWrap'
import { Layout } from '../components/Layout'
import { Head } from '../components/Head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Head />
        <Sidebar />
        <PageWrap>
          <Component {...pageProps} />
        </PageWrap>
      </Layout>
    </ThemeProvider>
  )
}

export default App
