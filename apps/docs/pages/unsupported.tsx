import { unsupportedProperties } from '@compai/css-gui'

export default function UnsupportedProperties() {
  return (
    <div>
      <h1>Unsupported properties</h1>
      <p>
        CSS GUI is a work in progress, below is an up to date listing of
        properties that haven't been implemented yet.
      </p>
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
