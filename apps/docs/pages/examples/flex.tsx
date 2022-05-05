import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'
import { Container } from '../../components/Container'

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

            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />One</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Two</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Three</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Four</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Five</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Six</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Seven</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Eight</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Nine</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Ten</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Eleven</div>
            <div sx={{outline: '1px solid' }}><img sx={{ display: 'block', maxWidth: '128px', }} src='https://source.unsplash.com/random' />Twelve</div>
          </styled.div>
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
