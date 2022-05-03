import { useState } from 'react'
import { codegen, Editor, styled } from '@compai/css-gui'

export const SpaceExample = () => {
  const [styles, setStyles] = useState({
    marginTop: { value: 1, unit: 'rem' },
    marginBottom: { value: 1, unit: 'rem' },
    marginLeft: { value: 1, unit: 'rem' },
    marginRight: { value: 1, unit: 'rem' },
    paddingTop: { value: 1, unit: 'rem' },
    paddingBottom: { value: 1, unit: 'rem' },
    paddingLeft: { value: 1, unit: 'rem' },
    paddingRight: { value: 1, unit: 'rem' },
  })

  return (
    <div>
      <div
        sx={{
          ':first-child > div': {
            display: 'grid',
            gap: '.5rem',
          },
        }}
      >
        {/** @ts-ignore */}
        <Editor styles={styles} onChange={setStyles} />
      </div>
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
