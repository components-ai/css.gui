import {
  ResponsiveInput,
  Length,
  LengthInput,
  ResponsiveLength,
  Primitives,
  Color,
  Styles,
  toCSSObject,
} from 'gui'
import { useState } from 'react'
import { FirstParagraph } from '../components/FirstParagraph'

type StyleObject = Record<string, Length | ResponsiveLength>
const initialStyles: StyleObject = {
  fontSize: { value: 16, unit: 'px' },
  lineHeight: { value: 1.4, unit: 'number' },
}

export default function Docs() {
  const [styles, setStyles] = useState<Styles>(initialStyles)
  const [color, setColor] = useState<Color>('tomato')

  const getStylesForRender = () => {
    const convertedStyles = toCSSObject({ ...styles, color })
    return convertedStyles
  }

  return (
    <>
      <h1>CSS GUI</h1>
      <FirstParagraph>
        A visual toolkit for editing element styles on the web. It's
        theme-aware, performant, and can be composed into any React app.
      </FirstParagraph>

      <div
        className="full-bleed"
        sx={{
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          py: [2, 3, 4],
          borderTopWidth: 'thin',
          borderTopStyle: 'solid',
          borderColor: 'border',
        }}
      >
        <div sx={{ px: [2, 3, 4] }}>
          <label
            sx={{ display: 'flex', fontWeight: 700, alignItems: 'center' }}
          >
            Color
            <Primitives.ColorPopover value={color} onChange={setColor} />
          </label>
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
        </div>
        <p sx={getStylesForRender()}>
          “The parameters comprise sequences which are theoretically infinite
          but limits are, of course, set to them in practice. There is an upward
          limit to size and certainly a downward one... Within these sequences
          there are reasonable bounds; extremes set by technical and functional
          experience”
        </p>
      </div>
      <div className="full-bleed">
        <pre
          sx={{
            p: [2, 3, 4],
            borderTop: 'thin solid',
            borderColor: 'border',
            width: '100%',
          }}
        >
          {JSON.stringify(styles, null, 2)}
        </pre>
      </div>
    </>
  )
}
