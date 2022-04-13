import {
  FontSize,
  ResponsiveInput,
  Length,
  LengthInput,
  ThemeProvider,
  ResponsiveLength,
} from 'gui'
import { useState } from 'react'

export default function Docs() {
  const [fontSize, setFontSize] = useState<Length | ResponsiveLength>({
    value: 16,
    unit: 'px',
  })
  return (
    <ThemeProvider
      theme={{
        fontSizes: [
          { id: '1', value: 16, unit: 'px' },
          { id: '2', value: 24, unit: 'px' },
          { id: '3', value: 32, unit: 'px' },
          { id: '4', value: 48, unit: 'px' },
          { id: '5', value: 64, unit: 'px' },
        ],
      }}
    >
      <div style={{ padding: 64 }}>
        <ResponsiveInput
          Component={LengthInput}
          label="Font size"
          value={fontSize}
          onChange={(newFontValue: Length | ResponsiveLength) =>
            setFontSize(newFontValue)
          }
        />
        <pre>{JSON.stringify(fontSize, null, 2)}</pre>
      </div>
    </ThemeProvider>
  )
}
