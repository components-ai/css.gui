import { useState } from 'react'
import Link from 'next/link'
import { LineHeightInput, FontSizeInput, Editor, toCSSObject } from 'gui'
import { FirstParagraph } from '../components/FirstParagraph'

const initialStyles: any = {
  fontSize: { value: 16, unit: 'px' },
  lineHeight: { value: 1.4, unit: 'number' },
  color: 'tomato',
}

export default function Docs() {
  const [styles, setStyles] = useState<any>(initialStyles)

  const getStylesForRender = () => {
    const convertedStyles = toCSSObject(styles)
    return convertedStyles
  }

  return (
    <>
      <h1>Visual styling controls for the web</h1>
      <FirstParagraph>
        <p>
          A powerful, extensible, and themeable CSS editor for creative coding
          and end-user styling
        </p>
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
          <Editor styles={styles} onChange={setStyles} />
          <FontSizeInput
            value={styles.fontSize}
            onChange={(fontSize: any) => setStyles({ ...styles, fontSize })}
          />
          <LineHeightInput
            value={styles.lineHeight}
            onChange={(lineHeight: any) => setStyles({ ...styles, lineHeight })}
          />
        </div>
        <p sx={getStylesForRender()}>
          “The parameters comprise sequences which are theoretically infinite
          but limits are, of course, set to them in practice. There is an upward
          limit to size and certainly a downward one... Within these sequences
          there are reasonable bounds; extremes set by technical and functional
          experience”
          <br /> <br />
          <em>
            In{' '}
            <Link
              href="https://www.lars-mueller-publishers.com/designing-programmes-0"
              passHref={true}
            >
              <a style={{ color: styles.color }}>Designing Programmes</a>
            </Link>{' '}
            by Karl Gerstner
          </em>
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
      <h2></h2>
    </>
  )
}
