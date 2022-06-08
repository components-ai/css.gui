import { useState } from 'react'
import { Editor, styled, toCSSObject, useTheme } from '@compai/css-gui'

export const Fieldset = () => {
  const theme = useTheme()

  const [styles, setStyles] = useState<any>({
    '::first-letter': {
      fontSize: { value: 32, unit: 'px' },
      color: 'tomato',
    },
    fontSize: { value: 16, unit: 'px' },
  })

  return (
    <>
      <Editor styles={styles} onChange={setStyles} />
      <styled.p styles={styles}>
        Hello, <b className="some-class">world!</b>
      </styled.p>
      <pre>{JSON.stringify(toCSSObject(styles, theme), null, 2)}</pre>
    </>
  )
}
