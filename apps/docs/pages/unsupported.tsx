import { allProperties, unsupportedProperties } from '@compai/css-gui'

export default function UnsupportedProperties() {
  const allPropertiesCount = allProperties.length
  const unsupportedPropertiesCount = unsupportedProperties.length
  const implementedPropertiesCount =
    allPropertiesCount - unsupportedPropertiesCount
  const percentageComplete = Math.round(
    (implementedPropertiesCount / allPropertiesCount) * 100
  )

  return (
    <div>
      <h1>Unsupported properties</h1>
      <p>
        CSS GUI is a work in progress, below is an up to date listing of
        properties that haven&apos;t been implemented yet.
      </p>
      <label htmlFor="progress" sx={{ fontWeight: 500 }}>
        So far, we&apos;ve implemented {implementedPropertiesCount} out of{' '}
        {allPropertiesCount} properties ({percentageComplete}%).
        <br />
        <progress
          id="progress"
          max="100"
          value={percentageComplete}
          sx={{ width: '100%' }}
        >
          {percentageComplete}%
        </progress>
      </label>
      <h2>The following properties are on our TODO list</h2>
      <ul>
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
  )
}
