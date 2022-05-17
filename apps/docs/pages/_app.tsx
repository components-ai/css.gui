import { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from 'theme-ui'
import { theme } from '@compai/css-gui'
import { Sidebar } from '../components/Sidebar'
import { PageWrap } from '../components/PageWrap'
import { Layout } from '../components/Layout'
import { Head } from '../components/Head'
import '../public/code-styles.css'

Router.events.on('routeChangeComplete', (url) => {
  // @ts-ignore
  window?.analytics?.page(url)
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
        <Head />
        <Layout>
          <Sidebar />
          <PageWrap>
            <Component {...pageProps} />
          </PageWrap>
        </Layout>
    </ThemeProvider>
  )
}

export default App
