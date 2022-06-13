import { useState } from 'react'
import { ColorPopover } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

export const ColorPickerExample = () => {
  const [color, setColor] = useState({ value: 'tomato' })

  return (
    <>
      <ColorPopover value={color} onChange={setColor} theme={defaultTheme}/>
      <p style={{ color: color.value}}>I am {color.value }!</p>
    </>
  )
}
