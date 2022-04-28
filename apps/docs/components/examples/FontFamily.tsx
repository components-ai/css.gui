import { useState } from 'react'
import { FontFamilyInput, RenderElement } from '@compai/css-gui'

export const FontFamilyExample = () => {
  const [fontFamily, setFontFamily] = useState('Abel')

  return (
    <>
      <RenderElement tagName='p' styles={{ fontFamily, fontSize: '24px' }}>
        Fun with fonts!
      </RenderElement>
      <FontFamilyInput value={fontFamily} onChange={setFontFamily} />
    </>
  )
}