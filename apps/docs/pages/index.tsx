import { useState } from 'react'
import Link from 'next/link'
import { Editor, RenderElement } from '@compai/css-gui'
import { FirstParagraph } from '../components/FirstParagraph'
import { Theme } from '@emotion/react'

const initialStyles: any = {
  fontSize: { value: 16, unit: 'px' },
  lineHeight: { value: 1.4, unit: 'number' },
  textAlign: 'inherit',
  color: 'tomato',
  backgroundColor: 'black',
  height: {
    value: 'auto',
    unit: 'keyword',
  },
  width: {
    value: 'auto',
    unit: 'keyword',
  },
}
const DEFAULT_THEME: Theme = {
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
  colors: [
    {
      id: '1',
      name: 'gray',
      colors: [
        { id: '2', value: '#000000' },
        { id: '3', value: '#1c1c1c' },
        { id: '4', value: '#303030' },
        { id: '5', value: '#474747' },
        { id: '6', value: '#5d5d5d' },
        { id: '7', value: '#757575' },
        { id: '8', value: '#8c8c8c' },
        { id: '9', value: '#a3a3a3' },
        { id: '10', value: '#bababa' },
        { id: '11', value: '#d1d1d1' },
        { id: '12', value: '#e8e8e8' },
        { id: '13', value: '#ffffff' },
      ],
    },
  ],
}
export default function Docs() {
  const [styles, setStyles] = useState<any>(initialStyles)

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
          py: [2, 3, 4],
          borderTopWidth: 'thin',
          borderTopStyle: 'solid',
          borderColor: 'border',
        }}
      >
        <div sx={{ px: [2, 3, 4] }}>
          <Editor styles={styles} onChange={setStyles} theme={DEFAULT_THEME} />
        </div>
        <RenderElement tagName="p" styles={styles}>
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
        </RenderElement>
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
