import {
  ResponsiveInput,
  Length,
  LengthInput,
  ThemeProvider,
  ResponsiveLength,
  Primitives,
  Color,
  AbsoluteLengthUnits,
  UnitlessUnits,
} from 'gui'
import { useState } from 'react'

type StyleObject = Record<string, Length | ResponsiveLength>
const initialStyles: StyleObject = {
  fontSize: { value: 16, unit: 'px' },
  lineHeight: { value: 1.4, unit: 'number' },
}

export default function Docs() {
  const [styles, setStyles] = useState<StyleObject>(initialStyles)
  const [color, setColor] = useState<Color>('tomato')

  const getStylesForRender = () => {
    let fontSize = null
    let lineHeight = null

    if (Array.isArray(styles.fontSize)) {
      const f: Length = styles.fontSize[styles.fontSize.length - 1] || {
        value: 16,
        unit: 'px',
      }
      fontSize = f.value + f.unit
    } else {
      fontSize = styles.fontSize.value + styles.fontSize.unit
    }

    if (Array.isArray(styles.lineHeight)) {
      const l: Length = styles.lineHeight[styles.lineHeight.length - 1] || {
        value: 1.4,
        unit: '',
      }
      lineHeight = l.value + l.unit
    } else {
      lineHeight = styles.lineHeight.value
    }

    return { fontSize, lineHeight, color }
  }

  return (
    <ThemeProvider
      theme={{
        fontSizes: [
          { id: '1', value: 16, unit: AbsoluteLengthUnits.Px },
          { id: '2', value: 24, unit: AbsoluteLengthUnits.Px },
          { id: '3', value: 32, unit: AbsoluteLengthUnits.Px },
          { id: '4', value: 48, unit: AbsoluteLengthUnits.Px },
          { id: '5', value: 64, unit: AbsoluteLengthUnits.Px },
        ],
        lineHeights: [
          { id: '1', value: 1, unit: UnitlessUnits.Number },
          { id: '2', value: 1.2, unit: UnitlessUnits.Number },
          { id: '3', value: 1.4, unit: UnitlessUnits.Number },
        ],
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ padding: 64, maxWidth: 256 }}>
          <Primitives.ColorPopover value={color} onChange={setColor} />
          <ResponsiveInput
            Component={LengthInput}
            label="Font size"
            value={styles.fontSize}
            onChange={(fontSize: Length | ResponsiveLength) =>
              setStyles({ ...styles, fontSize })
            }
          />
          <ResponsiveInput
            Component={LengthInput}
            label="Line height"
            value={styles.lineHeight}
            onChange={(lineHeight: Length | ResponsiveLength) =>
              setStyles({ ...styles, lineHeight })
            }
          />
          <pre>{JSON.stringify(styles, null, 2)}</pre>
        </div>
        <p style={getStylesForRender()}>
          “The parameters comprise sequences which are theoretically infinite
          but limits are, of course, set to them in practice. There is an upward
          limit to size and certainly a downward one... Within these sequences
          there are reasonable bounds; extremes set by technical and functional
          experience”
        </p>
      </div>
    </ThemeProvider>
  )
}
