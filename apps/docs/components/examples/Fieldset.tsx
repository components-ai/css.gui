import { useState } from 'react'
import {
  Editor,
  styled,
  Fieldset as FieldsetInput,
  Inputs,
  toCSSObject,
} from '@compai/css-gui'

export const Fieldset = () => {
  const [styles, setStyles] = useState<any>({
    '::first-letter': {
      fontSize: { unit: 'px', value: 32 },
    },
    '.some-class': {
      color: 'tomato',
    },
    fontSize: { unit: 'px', value: 16 },
  })

  return (
    <>
      <Editor styles={styles} onChange={setStyles} />
      <styled.p styles={styles}>
        Hello, <b>world!</b>
      </styled.p>
      <pre>{JSON.stringify(toCSSObject(styles), null, 2)}</pre>
    </>
  )
}
