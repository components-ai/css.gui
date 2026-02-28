import { useState } from 'react'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  alignSelf: 'initial',
  alignContent: 'initial',
  justifyContent: 'space-between',
  columnGap: {
    value: 1,
    unit: 'vw',
  },
  rowGap: {
    value: 1,
    unit: 'vw',
  },
  // Font
  fontSize: {
    value: 1.5,
    unit: 'rem',
  },
  fontFamily: 'Space Mono',
}

export default function TextDecoration() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        sx={{
          py: 5,
          px: 4,
          display: 'flex',
        }}
      >
        <div sx={{ px: [2, 3, 4] }}>
          <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
            <>
              <section sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
                <h3 sx={{ my: 0 }}>Flex</h3>
                <Inputs.Display />
                <Inputs.ColumnGap />
                <Inputs.RowGap />
                <Inputs.AlignItems />
                <Inputs.AlignSelf />
                <Inputs.AlignContent />
                <Inputs.JustifyContent />
                <Inputs.FlexBasis />
                <Inputs.FlexDirection />
                <Inputs.FlexFlow />
                <Inputs.FlexGrow />
                <Inputs.FlexShrink />
                <Inputs.FlexWrap />
              </section>
              <section sx={{ mt: 5, display: 'flex', gap: '2rem' }}>
                <Inputs.Color />
                <Inputs.BackgroundColor />
              </section>
              <section sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
                <h3 sx={{ mt: 3, mb: 0 }}>Font</h3>
                <Inputs.FontFamily />
                <Inputs.FontSize />
              </section>
            </>
          </Editor>
        </div>
        <div sx={{ flexGrow: 1, padding: 5 }}>
          <styled.div styles={styles}>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              One
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Two
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Three
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Four
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Five
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Six
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Seven
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Eight
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Nine
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Ten
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Eleven
            </div>
            <div sx={{ outline: '1px solid' }}>
              <img
                sx={{ display: 'block', maxWidth: '128px' }}
                src="https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg"
              />
              Twelve
            </div>
          </styled.div>
        </div>
      </div>
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
