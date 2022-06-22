import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  color: { type: 'theme', path: 'text' },
  backgroundColor: { type: 'theme', path: 'background' },
  fontFamily: 'Recursive',
  fontSize: {
    value: 3,
    unit: 'rem',
  },
  letterSpacing: 'initial',
  lineHeight: {
    value: 1.5,
    unit: 'number',
  },
  textDecorationColor: { type: 'theme', path: 'primary' },
  textDecorationThickness: {
    value: 0,
    unit: 'px',
  },
  textDecorationLine: 'none',
  textDecorationStyle: 'solid',
  width: {
    value: 100,
    unit: '%',
  },
  maxWidth: {
    value: 42,
    unit: 'em',
  },
}

export default function Typography() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        sx={{
          display: 'flex',
        }}
      >
        <div
          sx={{
            flexGrow: 1,
            padding: 5,
            minHeight: '40vh',
            maxHeight: '40vh',
            overflowY: 'scroll',
          }}
        >
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
      <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
        <>
          <h3 sx={{ mt: 3, mb: 4, px: 4 }}>Typography</h3>
          <div
            sx={{
              px: 4,
              pb: 5,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              alignItems: 'start',
              gap: '2rem',
              justifyContent: 'space-evenly',
            }}
          >
            <section sx={{ display: 'grid', gap: '1rem' }}>
              <div sx={{ display: 'flex', gap: '2rem' }}>
                <Inputs.Color />
                <Inputs.BackgroundColor />
              </div>
              <Inputs.FontFamily />
            </section>
            <section sx={{ display: 'grid', gap: '1rem' }}>
              <Inputs.FontSize />
              <Inputs.FontWeight />
              <Inputs.LineHeight />
              <Inputs.TextAlign />
              <Inputs.LetterSpacing />
              <Inputs.TextIndent />
              <Inputs.TextTransform />
              <Inputs.FontStyle />
              <Inputs.VerticalAlign />
              <Inputs.WhiteSpace />
            </section>
            <section sx={{ display: 'grid', gap: '1rem' }}>
              <Inputs.TextDecorationColor />
              <Inputs.TextDecorationLine />
              <Inputs.TextDecorationThickness />
              <Inputs.TextDecorationSkipInk />
              <Inputs.TextDecorationSkip />
              <Inputs.TextDecorationStyle />
              <Inputs.TextShadow />
              <Inputs.FontSynthesis />
              <Inputs.FontVariantCaps />
              <Inputs.FontVariantEastAsian />
              <Inputs.FontVariantLigatures />
              <Inputs.FontVariantNumeric />
              <Inputs.FontVariantPosition />
              <Inputs.FontStretch />
            </section>
            <section sx={{ display: 'grid', gap: '1rem' }}>
              <Inputs.TextOrientation />
              <Inputs.TextOverflow />
              <Inputs.TextAlignAll />
              <Inputs.TextAlignLast />
              <Inputs.TextEmphasisColor />
              <Inputs.TextEmphasisPosition />
              <Inputs.TextEmphasisStyle />
              <Inputs.TextRendering />
              <Inputs.TextUnderlinePosition />
              <Inputs.TextWrap />
              <Inputs.WordSpacing />
              <Inputs.WordWrap />
              <Inputs.Widows />
              <Inputs.Width />
              <Inputs.MaxWidth />
              <Inputs.MinWidth />
            </section>
          </div>
        </>
      </Editor>
      <div>
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
