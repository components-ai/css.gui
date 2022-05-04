import { useState } from 'react'
import { FontFamilyInput, styled } from '@compai/css-gui'

export const FontFamilyExample = () => {
  const [styles, setStyles] = useState({ fontFamily: 'Recursive' })

  return (
    <>
      <styled.p styles={styles}>Fun with fonts!</styled.p>
      <FontFamilyInput value={styles} onChange={setStyles} />
    </>
  )
}
