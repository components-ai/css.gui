import { AppProps } from 'next/app'
import Router, { NextRouter, useRouter } from 'next/router'
import { ReactChild } from 'react'
import { ThemeProvider } from 'theme-ui'
import {
  ThemeProvider as EditorThemeProvider,
  theme,
  importTheme,
} from '@compai/css-gui'
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
  '/dev': true,
}
const isNoNavPage = (router: NextRouter) => {
  if (router.pathname.startsWith('/library')) {
    return true
  }

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
      <EditorThemeProvider theme={importTheme(theme)}>
        <Head />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </EditorThemeProvider>
    </ThemeProvider>
  )
}

export default App
