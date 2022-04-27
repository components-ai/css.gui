import { getStyles } from './get-styles'

const FIXTURE = {
  type: 'linear',
  metadata: { relatedStyles: { color: 'black' } },
  degrees: 121,
  stops: [
    { color: '#46d64f', hinting: 0 },
    { color: '#9BD47D', hinting: 100 },
  ],
}

const RADIAL_FIXTURE = {
  ...FIXTURE,
  type: 'radial',
  shape: 'circle',
  location: 'bottom',
}

test('returns a proper CSS object', () => {
  const result = getStyles(FIXTURE)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "backgroundImage": "linear-gradient(121deg, #46d64f 0%, #9BD47D 100%)",
      "color": "black",
    }
  `)
})

test('returns a proper CSS object for an array', () => {
  const result = getStyles([FIXTURE, FIXTURE], FIXTURE.metadata)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "backgroundImage": "linear-gradient(121deg, #46d64f 0%, #9BD47D 100%), linear-gradient(121deg, #46d64f 0%, #9BD47D 100%)",
      "color": "black",
    }
  `)
})

test('returns a radial gradient', () => {
  const result = getStyles([RADIAL_FIXTURE, FIXTURE])

  expect(result).toMatchInlineSnapshot(`
    Object {
      "backgroundImage": "radial-gradient(circle at 50% 50%, #46d64f 0%, #9BD47D 100%), linear-gradient(121deg, #46d64f 0%, #9BD47D 100%)",
    }
  `)
})
