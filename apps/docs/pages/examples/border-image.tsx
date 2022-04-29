import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, RenderElement, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  padding: {
    value: 64,
    unit: 'px',
  },
  borderStyle: 'solid',
  borderWidth: {
    value: 16,
    unit: 'px',
  },
  borderRadius: {
    value: 0,
    unit: 'px',
  },
  borderImageSlice: 1,
  borderImageSource: [],
}

export default function BorderImage() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
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
          <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
            <div sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
              <Inputs.BorderImageSource />
              <Inputs.BorderImageSlice />
              <Inputs.BorderWidth />
              <Inputs.Padding />
            </div>
          </Editor>
        </div>
        <div sx={{ flexGrow: 1, pr: 4 }}>
          <RenderElement tagName="p" styles={styles}>
            “The parameters comprise sequences which are theoretically infinite
            but limits are, of course, set to them in practice. There is an
            upward limit to size and certainly a downward one... Within these
            sequences there are reasonable bounds; extremes set by technical and
            functional experience”
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
          {codegen.css(styles)}
        </pre>
      </div>
    </>
  )
}
