import { useState } from 'react'
import { Editor, styled, Fieldset, Inputs, codegen } from '@compai/css-gui'

// This page isn't used right now so just comment it out to get it to build
export const TypographyGroupExample = () => {
  const [styles, setStyles] = useState({})

  return (
    <>
      <div sx={{ display: 'flex' }}>
        <Editor styles={styles} onChange={setStyles}>
          <>
            <Fieldset type="element" name="h1">
              <>
                <h2>Heading</h2>
                {/* <Inputs.FontSize /> */}
              </>
            </Fieldset>
            <Fieldset type="element" name="p">
              <>
                <h2>Body</h2>
                {/* <Inputs.FontSize /> */}
              </>
            </Fieldset>
            <Fieldset type="element" name="pre">
              <>
                <h2>Code</h2>
                {/* <Inputs.FontSize /> */}
              </>
            </Fieldset>
          </>
        </Editor>
        <styled.div styles={styles}>
          <h1>Heading</h1>
          <p>Body text</p>
          <pre>Code text</pre>
        </styled.div>
      </div>
      <pre
        sx={{ borderTop: 'thin solid', borderColor: 'border', p: [3, 4, 5] }}
      >
        {codegen.css(styles)}
      </pre>
    </>
  )
}
