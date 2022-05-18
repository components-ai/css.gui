import { useState } from 'react'
import { FontFamilyInput, styled } from '@compai/css-gui'

export const FontFamilyExample = () => {
  const [styles, setStyles] = useState({
    fontFamily: 'Recursive',
    fontSize: {
      value: 96,
      unit: 'px',
    },
    marginTop: {
      value: 0,
      unit: 'rem',
    },
    marginBottom: {
      value: 0,
      unit: 'rem',
    },
    whiteSpace: 'nowrap',
  })

  return (
    <>
      <styled.p styles={styles}>Fun with fonts!</styled.p>
      <div sx={{ '& > div': { display: 'grid', gap: '1rem' } }}>
        <FontFamilyInput
          value={styles}
          onChange={(newStyles) => setStyles({ ...styles, ...newStyles })}
        />
      </div>
    </>
  )
}
