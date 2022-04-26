import { useState } from 'react'
import {
  Editor,
  RenderElement,
  Fieldset as FieldsetInput,
  Inputs,
  toCSSObject,
} from '@compai/css-gui'

export const Fieldset = () => {
  const [styles, setStyles] = useState({})

  return (
    <>
      <Editor styles={styles} onChange={setStyles}>
        <>
          <Inputs.FontSize />
          <FieldsetInput type="pseudo-element" name="first-letter">
            <>
              <h2>First letter</h2>
              <Inputs.FontSize />
            </>
          </FieldsetInput>
          <FieldsetInput type="pseudo-element" name="selection">
            <>
              <h2>Selection</h2>
              <Inputs.BackgroundColor />
            </>
          </FieldsetInput>
          <FieldsetInput type="element" name="b">
            <>
              <h2>Bold</h2>
              <Inputs.Color />
            </>
          </FieldsetInput>
        </>
      </Editor>
      <RenderElement tagName="p" styles={styles}>
        Hello, <b>world!</b>
      </RenderElement>
      <pre>{JSON.stringify(toCSSObject(styles), null, 2)}</pre>
    </>
  )
}
