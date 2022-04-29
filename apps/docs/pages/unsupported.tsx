import { unsupportedProperties } from '@compai/css-gui'

export default function UnsupportedProperties() {
  return (
    <ul>
      {unsupportedProperties.map((property) => {
        return (
          <li>
            <a
              sx={{ color: 'text' }}
              href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`}
            >
              {property}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
