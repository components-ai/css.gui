import { AppProps } from 'next/app'
import Router, { NextRouter, useRouter } from 'next/router'
import { ReactChild } from 'react'
import { ThemeProvider } from 'theme-ui'
import { theme } from '@compai/css-gui'
import { Sidebar } from '../components/Sidebar'
import { PageWrap } from '../components/PageWrap'
import { Layout } from '../components/Layout'
import { Layout as PlaygroundLayout } from '../components/playground/Layout'
import { Head } from '../components/Head'
import '../public/code-styles.css'

Router.events.on('routeChangeComplete', (url) => {
  // @ts-ignore
  window?.analytics?.page(url)
})

const NO_NAV_PAGES: Record<string, boolean> = {
  '/playground': true,
  '/html-editor': true,
}
const isNoNavPage = (router: NextRouter) => {
  return NO_NAV_PAGES[router.pathname] ?? false
}

type DocsLayoutProps = {
  children: ReactChild
}
const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <Layout>
      <Sidebar />
      <PageWrap>{children}</PageWrap>
    </Layout>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const AppLayout = isNoNavPage(router) ? PlaygroundLayout : DocsLayout

  return (
    <ThemeProvider theme={theme}>
      <Head />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  )
}

export default App
