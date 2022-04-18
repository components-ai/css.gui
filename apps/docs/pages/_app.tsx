import { EditorProvider } from 'gui'
import { AppProps } from 'next/app'

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
      <div
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
        }}
      >
        <Component {...pageProps} />
      </div>
    </EditorProvider>
  )
}

export default App
