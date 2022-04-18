import {
  ResponsiveInput,
  Length,
  LengthInput,
  ResponsiveLength,
  Primitives,
  Color,
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
    <div className="full-bleed" style={{ display: 'flex' }}>
      <div style={{ padding: 64 }}>
        <Primitives.ColorPopover value={color} onChange={setColor} />
        <ResponsiveInput
          Component={LengthInput}
          label="Font size"
          property="fontSize"
          value={styles.fontSize}
          onChange={(fontSize: Length | ResponsiveLength) =>
            setStyles({ ...styles, fontSize })
          }
        />
        <ResponsiveInput
          Component={LengthInput}
          label="Line height"
          property="lineHeight"
          value={styles.lineHeight}
          onChange={(lineHeight: Length | ResponsiveLength) =>
            setStyles({ ...styles, lineHeight })
          }
        />
        <pre>{JSON.stringify(styles, null, 2)}</pre>
      </div>
      <p style={getStylesForRender()}>
        “The parameters comprise sequences which are theoretically infinite but
        limits are, of course, set to them in practice. There is an upward limit
        to size and certainly a downward one... Within these sequences there are
        reasonable bounds; extremes set by technical and functional experience”
      </p>
    </div>
  )
}
