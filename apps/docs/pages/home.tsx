import { FirstParagraph } from '../components/FirstParagraph'
import { Demo } from '../components/examples/Demo'

export default function Docs() {
  return (
    <>
      <h1 sx={{my: 0}}>Visual styling controls for the web</h1>
      <FirstParagraph>
        <p>
          A powerful, extensible, and themeable CSS editor for creative coding
          and end-user styling
        </p>
      </FirstParagraph>
      <ul sx={{ listStyleType: 'none' }}>
        <li>Controls for 692 CSS properties</li>
        <li>+1000 Google Fonts</li>
        <li>Responsive values</li>
        <li>Theme aware controls</li>
        <li>Scrubbable number inputs</li>
      </ul>
      <Demo />
    </>
  )
}
