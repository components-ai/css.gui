import { Editor, parseStyles, styled } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = parseStyles({
  transition:
    'width 250ms cubic-bezier(0, 0, 1, 0), background-color 350ms cubic-bezier(0.1, 0.2, 0.9, 0.75)',
  width: '100%',
  height: '240px',
  // TODO theme colors again
  backgroundColor: 'rebeccapurple',
})

export default function Transitions() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <section sx={{ my: 5 }}>
          <styled.div styles={styles} />
        </section>
        <div sx={{ '& > div': { display: 'grid', gap: '1em' } }}>
          <Editor styles={styles} onChange={setStyles} />
        </div>
      </div>
    </div>
  )
}
