import { FirstParagraph } from '../components/FirstParagraph'
import { Demo } from '../components/examples/Demo'

export default function Docs() {
  return (
    <>
      <header sx={{ pt: 5 }}>
        <h1 sx={{ fontSize: '128px', my: 0, lineHeight: 1 }}>CSS GUI</h1>
        <h2 sx={{ my: 0 }}>
          A composable, extensible, and themeable CSS editor for creative coding
          and end-user styling.
        </h2>
        <h4 sx={{ mt: 5 }}>Install</h4>
        <code 
          sx={{ 
            bg: 'backgroundOffset', 
            p: 3, 
            borderRadius: '6px', 
            width: '100%', 
            display: 'block', 
        }}>
          npm install --save @compai/css-gui
        </code>
      </header>
      <h4 sx={{ mt: 5, }}>Features</h4>
      <ul sx={{ listStyleType: 'none', mb: 7, display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <li>692 properties</li>
        <li>+1000 Google Fonts</li>
        <li>Variable fonts</li>
        <li>Responsive value arrays</li>
        <li>Theme aware inputs</li>
        <li>Scrubbable number inputs</li>
        <li>Supports all CSS units</li>
        <li>Advanced layer based gradient editor</li>
        <li>Target pseudo-elements and pseudo-classes</li>
        <li>Cubic bezier curve editor for animations</li>
        <li>Completely open source</li>
      </ul>
      <section className='full-bleed'>
        <h2 sx={{textAlign: 'center'}}>Demo</h2>
        <Demo />
      </section>
    </>
  )
}
