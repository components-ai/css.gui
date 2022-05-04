import { useState } from 'react'
import { FontFamilyInput, styled } from '@compai/css-gui'

export const FontFamilyExample = () => {
  const [styles, setStyles] = useState({ fontFamily: 'Abel'})

  return (
    <>
      <styled.p styles={{ fontFamily: styles, fontSize: '24px' }}>
        Fun with fonts!
      </styled.p>
      <FontFamilyInput value={styles} onChange={setStyles} />
    </>
  )
}
