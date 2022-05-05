import { allProperties, unsupportedProperties } from '@compai/css-gui'
import { FirstParagraph } from '../components/FirstParagraph'
import { Container } from '../components/Container'



export default function UnsupportedProperties() {
  const allPropertiesCount = allProperties.length
  const unsupportedPropertiesCount = unsupportedProperties.length
  const implementedPropertiesCount =
    allPropertiesCount - unsupportedPropertiesCount
  const percentageComplete = Math.round(
    (implementedPropertiesCount / allPropertiesCount) * 100
  )

  return (
<Container>
    <div sx={{ pt: [5,6] }}>
      <h1>Unsupported properties</h1>
      <FirstParagraph>
        <p>
          CSS GUI is a work in progress, below is an up to date listing of
          properties that haven&apos;t been implemented yet.
        </p>
      </FirstParagraph>
      <label htmlFor="progress" sx={{
        fontSize: 3,
      }}>
        <span>So far, we&apos;ve implemented <b>{implementedPropertiesCount} out of{' '}
        {allPropertiesCount}</b> properties ({percentageComplete}%).</span>
        <progress
          id="progress"
          max="100"
          value={percentageComplete}
          sx={{ 
            mt: 2,
            width: '100%', 
            WebKitAppearance: 'none',
            appearance: 'none',
            height: '48px',
          }}
        >
          {percentageComplete}%
        </progress>
      </label>
      <div sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <span>0</span>
        <span>427</span>
      </div>
      <h2 sx={{ mt: 5 }}>The following properties are on our TODO list</h2>
      <ul sx={{ pl: 3 }}>
        {unsupportedProperties.map(({ property, url }) => {
          return (
            <li>
              {property}{' '}
              <a sx={{ color: 'text' }} href={url}>
                W3C
              </a>{' '}
              <a
                sx={{ color: 'text' }}
                href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`}
              >
                MDN
              </a>
            </li>
          )
        })}
      </ul>
    </div>
</Container>
  )
}
