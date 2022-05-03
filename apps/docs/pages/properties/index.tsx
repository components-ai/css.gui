import { supportedProperties } from '@compai/css-gui'
import Link from 'next/link'
import { kebabCase } from 'lodash-es'

export default function Properties() {
  return (
    <div>
      <h1>Properties</h1>
      <p>List of all properties supported in CSS GUI with example usage.</p>
      <ul sx={{ listStyleType: 'none', m: 0, p: 0 }}>
        {supportedProperties.map(({ property }: any) => {
          return (
            <li sx={{ display: 'inline' }}>
              <Link href={`/properties/${kebabCase(property)}`} passHref={true}>
                <a
                  sx={{
                    fontWeight: 600,
                    color: 'text',
                    mr: 2,
                    fontSize: 2,
                    ':hover': {
                      color: 'primary',
                    },
                  }}
                >
                  {kebabCase(property)}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
