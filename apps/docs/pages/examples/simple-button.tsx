import { Editor, Fieldset, Inputs, codegen, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  color: { value: '#fff' },
  backgroundColor:  { value: '#6465ff' },
  borderRadius: {
    value: 6,
    unit: 'px',
  },
  appearance: 'none',
  borderWidth: {
    value: 0,
    unit: 'px',
  },
  fontWeight: '600',
  fontSize: '16px',
  outlineWidth: {
    value: 0,
    unit: 'px',
  },
  outlineColor: {value: 'rgba(255,255,255,0)'},
  outlineOffset: {
    value: 0,
    unit: 'px',
  },
  'hover': {
    color: { value: '#ffffff' },
    backgroundColor: { value: '#3e38b0' },
    outlineColor: { value: '#3e38b0' },
  },
  'focus': {
    color: { value: '#ffffff' },
    backgroundColor: { value: '#3e38b0'},
    outlineWidth: {
      value: 4,
      unit: 'px',
    },
    outlineColor: { value: '#3e38b0'},
    outlineStyle: 'solid',
    outlineOffset: {
      value: 4,
      unit: 'px',
    }
  },
  'active': {
    color: { value: '#ffffff' },
    backgroundColor: { value: '#8170ff' },
    outlineColor: { value: '#8170ff' },
  },
}

export default function SimpleButton() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ px: 5, pt: 5, display: 'grid', gridTemplateColumns: '1fr 3fr', gridGap: '4em',  }}>
        <div sx={{ 
          p: 4,
          borderRadius: '6px',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.2), inset 0 0 0 1px rgba(255,255,255,.2)',
        }}>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div sx={{ display: 'flex', gap: '2em', mb: 3}}>
            <Inputs.Color />
            <Inputs.BackgroundColor />
          </div>
          <div sx={{ mb: 3}}>
            <Inputs.BorderRadius />
          </div>
          <Inputs.FontWeight />
          <Fieldset type='pseudo-class' name='hover'>
            <h4 sx={{ color: 'muted', mb: 2, mt: 4, fontSize: '1rem' }}>Hover</h4>
            <div sx={{ display: 'flex', gap: '2em', mb: 3}}>
              <Inputs.Color />
              <Inputs.BackgroundColor />
              <Inputs.OutlineColor />
            </div>
          </Fieldset>
          <Fieldset type='pseudo-class' name='focus'>
            <h4 sx={{ color: 'muted', mb: 2, mt: 4, fontSize: '1rem' }}>Focus</h4>
            <div sx={{ display: 'flex', gap: '2em', mb: 3}}>
              <Inputs.Color />
              <Inputs.BackgroundColor />
            </div>
            <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr 1fr)', columnGap: '2em',}}>
              <Inputs.OutlineColor />
              <Inputs.OutlineStyle />
              <Inputs.OutlineWidth />
              <Inputs.OutlineOffset />
            </div>
          </Fieldset>
          <Fieldset type='pseudo-class' name='active'>
            <h4 sx={{ color: 'muted',mb: 2, mt: 4, fontSize: '1rem' }}>Active</h4>
            <div sx={{ display: 'flex', gap: '2em', mb: 3}}>
              <Inputs.Color />
              <Inputs.BackgroundColor />
              <Inputs.OutlineColor />
            </div>
          </Fieldset>
        </Editor>
      </div>
      <div sx={{

        }}>
        <button
          sx={{
            px: 5,
            py: 3,
            transition: 'all .3s ease-in-out',
            cursor: 'pointer',
            ...toCSSObject(styles),
          }}
        >
          Click Here
        </button>
        </div>
        <code>
          <pre>
            {codegen.css(styles)}
          </pre>
        </code>
    </div>
  )
}
