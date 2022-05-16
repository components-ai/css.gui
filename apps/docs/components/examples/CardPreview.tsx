import { useState } from 'react'
import { Editor, styled, Fieldset, Inputs, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-card-preview'
import { defaultTheme } from '../../data/default-theme'

export const CardPreview = () => {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div>
        <styled.a styles={styles}>
          <img src='https://source.unsplash.com/random' />
          <h1>Heading</h1>
          <p>Body text</p>
        </styled.a>
        <Editor styles={styles} onChange={setStyles}>
          <>
            <Fieldset type="element" name="h1">
              <>
                <Inputs.FontSize />
              </>
            </Fieldset>
            <Fieldset type="element" name="p">
              <>
                <Inputs.FontSize />
              </>
            </Fieldset>
            <Fieldset type="element" name="img">
              <>
                <Inputs.FontSize />
              </>
            </Fieldset>
          </>
        </Editor>
      </div>
      <pre
        sx={{ borderTop: 'thin solid', borderColor: 'border', p: [3, 4, 5] }}
      >
        {codegen.css(styles)}
      </pre>
    </>
  )
}
