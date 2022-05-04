import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  fontFamily: 'Recursive',
  fontSize: {
    value: 3,
    unit: 'rem',
  },
  letterSpacing: {
    value: 'initial',
    unit: 'keyword',
  },
  lineHeight: {
    value: '1.5',
    unit: 'number',
  },
  textDecorationColor: 'primary',
  textDecorationThickness: {
    value: 8,
    unit: 'px',
  },
  textDecorationLine: 'underline',
  textDecorationStyle: 'wavy',
  width: {
    value: 100,
    unit: '%'
  },
  maxWidth: {
    value: 42,
    unit: 'em'
  }
}

export default function Typography() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        className="full-bleed"
        sx={{
          display: 'flex',
          py: [2, 3, 4],
          borderTopWidth: 'thin',
        }}
      >
        <div sx={{ px: [2, 3, 4] }}>
          <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
            <>
              <section sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
                <h3 sx={{ mt: 4, mb: 0 }}>Typography</h3>
                <Inputs.FontFamily />
              </section>
              <section sx={{ mt: 4, display: 'grid', gap: '.5rem', width: '240px' }}>
                <Inputs.FontSize />
                <Inputs.LineHeight />
                <Inputs.LetterSpacing />
                <Inputs.TextTransform />
                <Inputs.FontStretch />
                <Inputs.FontStyle />
                <Inputs.FontSynthesis />
                <Inputs.FontVariantCaps />
                <Inputs.FontVariantEastAsian />
                <Inputs.FontVariantLigatures />
                <Inputs.FontVariantNumeric />
                <Inputs.FontVariantPosition />
                <Inputs.VerticalAlign />
                <Inputs.WhiteSpace />
                <Inputs.TextAlign />
                <Inputs.TextIndent />
                <Inputs.TextOrientation />
                <Inputs.TextOverflow />
                <Inputs.TextAlignAll />
                <Inputs.TextAlignLast />
                <Inputs.TextEmphasisColor />
                <Inputs.TextEmphasisPosition />
                <Inputs.TextEmphasisStyle />
                <Inputs.TextRendering />
                <Inputs.TextShadow />
                <Inputs.TextUnderlinePosition />
                <Inputs.TextWrap />
                <Inputs.Widows />
                <Inputs.WordSpacing />
                <Inputs.WordWrap />
                <Inputs.Width />
                <Inputs.MaxWidth />
                <Inputs.MinWidth />
              </section>
              <section sx={{ mt: 4, display: 'grid', gap: '.5rem', width: '240px' }}>
                <h3 sx={{ my: 0 }}>Text Decoration</h3>
                <Inputs.TextDecorationColor />
                <Inputs.TextDecorationLine />
                <Inputs.TextDecorationThickness />
                <Inputs.TextDecorationSkipInk />
                <Inputs.TextDecorationSkip />
                <Inputs.TextDecorationStyle />
              </section>
            </>
          </Editor>
        </div>
        <div sx={{ flexGrow: 1, padding: 5 }}>
          <styled.p styles={styles}>
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
                <a style={{ color: 'inherit' }}>Designing Programmes</a>
              </Link>{' '}
              by Karl Gerstner
            </em>
          </styled.p>
        </div>
      </div>
      <div className="full-bleed">
        <pre
          sx={{
            p: [2, 3, 4],
            borderTop: 'thin solid',
            borderColor: 'border',
            width: '100%',
            fontSize: 3,
          }}
        >
          {codegen.css(styles)}
        </pre>
      </div>
    </>
  )
}
