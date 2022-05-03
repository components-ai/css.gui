import { useState } from 'react'
import { FontFamilyInput, styled } from '@compai/css-gui'

export const FontFamilyExample = () => {
  const [fontFamily, setFontFamily] = useState('Abel')

  return (
    <>
      <styled.p styles={{ fontFamily, fontSize: '24px' }}>
        Fun with fonts!
      </styled.p>
      <FontFamilyInput value={fontFamily} onChange={setFontFamily} />
    </>
  )
}
