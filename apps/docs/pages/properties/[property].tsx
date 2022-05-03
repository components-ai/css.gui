import { snakeCase, kebabCase, startCase } from 'lodash-es'
import pascalCase from 'pascalcase'
import {
  Editor,
  Inputs,
  styled,
  supportedProperties,
  allProperties,
  codegen,
  toCSSObject,
} from '@compai/css-gui'
import { useState } from 'react'
import Link from 'next/link'

type PropertyPageProps = {
  property: string
  url: string
  title: string
}
export default function PropertyPage({
  property,
  url,
  title,
}: PropertyPageProps) {
  const [styles, setStyles] = useState({ [snakeCase(property)]: 'inherit' })
  const controlName = pascalCase(property)
  const Input = Inputs[controlName]

  return (
    <>
      <h1 sx={{ fontSize: 2, mb: 4 }}>
        <Link href="/inputs/properties" passHref={true}>
          <a sx={{ color: 'muted', textDecoration: 'none' }}>Properties</a>
        </Link>{' '}
        / {startCase(property)}
      </h1>
      <h2>Resources</h2>
      <ul>
        <li>
          <Link href={url} passHref={true}>
            <a sx={{ color: 'text' }}>{title}</a>
          </Link>
        </li>
        <li>
          <Link
            href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${kebabCase(
              property
            )}`}
            passHref={true}
          >
            <a sx={{ color: 'text' }}>MDN - {startCase(property)}</a>
          </Link>
        </li>
      </ul>
      <h2>Demo</h2>
      <Editor styles={{ [snakeCase(property)]: {} }} onChange={setStyles}>
        <Input />
      </Editor>
      <styled.p styles={styles}>Hello, world!</styled.p>
      <hr sx={{ mt: 4 }} />
      <pre>{`import { useState } from 'react'
import { Editor, Inputs, styled } from '@compai/css-gui'

export function My${controlName}Editor () {
  const [styles, setStyles] = useState({ ${snakeCase(property)}: 'inherit' })

  return (
    <>
      <Editor styles={styles} onChange={setStyles}>
        <Inputs.${controlName} />
      </Editor>
      <styled.p styles={styles}>Hello, world!</styled.p>
    </>
  )
}
`}</pre>
      <hr sx={{ mt: 4 }} />
      <pre>{codegen.css(styles)}</pre>
      <hr sx={{ mt: 4 }} />
      <pre>{JSON.stringify(toCSSObject(styles), null, 2)}</pre>
    </>
  )
}

type Params = {
  property: string
}
type Props = {
  params: Params
}
export async function getStaticProps({ params }: Props) {
  const data = allProperties.find(
    (d) => kebabCase(d.property) === params.property
  )

  return {
    props: data,
  }
}

export async function getStaticPaths() {
  const paths = supportedProperties.map(({ property }: any) => {
    return { params: { property: kebabCase(property) } }
  })

  return {
    paths,
    fallback: false,
  }
}
