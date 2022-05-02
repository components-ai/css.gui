import { useState } from 'react'
import { codegen, Editor, styled } from '@compai/css-gui'

export const SpaceExample = () => {
  const [styles, setStyles] = useState({
    margin: { value: 16, unit: 'px' },
    padding: { value: 16, unit: 'px' },
  })

  return (
    <div>
      {/** @ts-ignore */}
      <Editor styles={styles} onChange={setStyles} />
      <div sx={{ border: 'thin solid', borderColor: 'border', mt: [3, 4, 5] }}>
        <styled.p styles={{ ...styles, border: 'thin solid' }}>
          Fun with space!
        </styled.p>
      </div>
      {/** @ts-ignore */}
      <pre>{codegen.css(styles)}</pre>
      <hr />
      <pre>{JSON.stringify(styles, null, 2)}</pre>
    </div>
  )
}
